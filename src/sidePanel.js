const vscode = require("vscode");
const { getCompletion } = require("./client");
const { chatPage } = require("./views");

let _panel;
const history = [];
const messages = [];

const chatboxProvider = {
  resolveWebviewView: (webviewView) => {
    _panel = webviewView;
    webviewView.webview.html = chatPage("", "");

    webviewView.webview.onDidReceiveMessage((message) => {
      if (message.type === "loading") {
        webviewView.webview.html = chatPage(message.loadingHistory);
      }
      if (message.type === "update") {
        const { history } = message;
        webviewView.webview.html = chatPage(history);
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
  () => inputQuestion()
);

const showPanel = async () =>
  await vscode.commands.executeCommand(
    "workbench.view.extension.ask-gpt-vscode"
  );

const inputQuestion = async () => {
  for (const [input_text, completion_text] of history) {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  showPanel();
  const question = await vscode.window.showInputBox({
    prompt: "Ask GPT a question",
  });
  if (question) {
    messages.push({ role: "user", content: question });
    const loadingHistory = [...history, [question, ""]];
    _panel.webview.postMessage({
      type: "loading",
      loadingHistory,
    });
    _panel.webview.html = chatPage(loadingHistory);
    const answer = await getCompletion(messages);
    if (answer) {
      history.push([question, answer]);
      if (_panel) {
        _panel.webview.postMessage({
          type: "update",
          history,
        });
        _panel.webview.html = chatPage(history);
      }
    } else {
      vscode.window.showErrorMessage("Unable to get answer from ChatGPT");
    }
  }
};

module.exports = { panelView, questionCommand };
