const vscode = require("vscode");

const chatboxProvider = {
  resolveWebviewView: (webviewView) => {
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = `<!doctype><html><body><h1>Test</h1></body></html>`;
  },
};

const panelView = vscode.window.registerWebviewViewProvider(
  "ask-gpt.panelView",
  chatboxProvider
);

module.exports = { panelView };
