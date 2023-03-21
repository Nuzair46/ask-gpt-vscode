const vscode = require("vscode");

const settingsProvider = {
  resolveWebviewView: (webviewView) => {
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = `<!doctype><html><body><h1>Settings</h1></body></html>`;
  },
};

const settingsView = vscode.window.registerWebviewViewProvider(
  "ask-gpt.settingsView",
  settingsProvider
);

module.exports = { settingsView };
