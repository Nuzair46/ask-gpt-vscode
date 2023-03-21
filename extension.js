const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  const provider = {
    resolveWebviewView: (webviewView) => {
      webviewView.webview.options = { enableScripts: true };
      webviewView.webview.html = `<!doctype><html><body><h1>Test</h1></body></html>`;
    },
  };

  const panelView = vscode.window.registerWebviewViewProvider(
    "ask-gpt.webView",
    provider
  );

  context.subscriptions.push(panelView);
};

// This method is called when your extension is deactivated
const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
