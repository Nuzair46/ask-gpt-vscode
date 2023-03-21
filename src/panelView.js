const vscode = require("vscode");
const { isApiKeySetupComplete } = require("./settings");

const chatboxProvider = {
  resolveWebviewView: (webviewView) => {
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = chatPage();
  },
};

const panelView = vscode.window.registerWebviewViewProvider(
  "ask-gpt.panelView",
  chatboxProvider
);

const chatPage = () => `
<!doctype html>
<html>
  <body>
  	${isApiKeySetupComplete() ? chatBox : invalidSetup}
  </body>
</html>
`;

const chatBox = `
	<p>Ask GPT a question and it will answer it.</p>
	<div id="chatbox"></div>
`;

const invalidSetup = `
	<p>Looks like OpenAI API Key was not setup. <br>
	1. Copy the API key from <a href="https://platform.openai.com/account/api-keys" target="_blank">OpenAI</a>.<br>
	2. Set it up with command + shift + p and search for 'Set OpenAI API Key'.<br>
	3. Set the API key in the input box.
	</p>
`;

module.exports = { panelView };
