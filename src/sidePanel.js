const vscode = require("vscode");
const { getCompletion } = require("./client");
const { chatPage } = require("./views");

let _panel;

const chatboxProvider = {
  resolveWebviewView: (webviewView) => {
    _panel = webviewView;
    webviewView.webview.html = chatPage("", "");

    webviewView.webview.onDidReceiveMessage((message) => {
      if (message.type === "loading") {
        webviewView.webview.html = chatPage(message.question, "");
      }
      if (message.type === "update") {
        const { question, answer } = message.payload;
        webviewView.webview.html = chatPage(question, answer);
      }
    });
  },
};

const panelView = vscode.window.registerWebviewViewProvider(
  "ask-gpt.panelView",
  chatboxProvider
);

const questionCommand = vscode.commands.registerCommand(
  "ask-gpt-vscode.askGpt",
  () => {
    inputQuestion();
  }
);

const inputQuestion = async () => {
  const question = await vscode.window.showInputBox({
    prompt: "Ask GPT a question",
  });
  if (question) {
    _panel.webview.postMessage({
      type: "loading",
      question,
    });
    _panel.webview.html = chatPage(question, "");
    const answer = await getCompletion(question);
    if (answer) {
      if (_panel) {
        _panel.webview.postMessage({
          type: "update",
          payload: {
            question,
            answer,
          },
        });
        _panel.webview.html = chatPage(question, answer);
      }
    } else {
      vscode.window.showErrorMessage("Unable to get answer from ChatGPT");
    }
  }
};

module.exports = { panelView, questionCommand };
