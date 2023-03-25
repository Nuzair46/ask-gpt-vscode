const vscode = require("vscode");

const setup = () => {
  !isApiKeySetupComplete() && inputApiKey();
};

const apiKeyCommand = vscode.commands.registerCommand(
  "ask-gpt-vscode.setApiKey",
  () => {
    inputApiKey();
  }
);

const inputApiKey = async () => {
  const apiKey = await vscode.window.showInputBox({
    prompt:
      "Enter OpenAI API Key from [OpenAI](https://platform.openai.com/account/api-keys) (Will reload vscode)",
    placeHolder: "sk-************************************",
  });
  setApiKey(apiKey);
};

const isApiKeySetupComplete = () => {
  const apiKey = getApiKey();

  return apiKey.length > 0 && apiKey;
};

const getApiKey = () =>
  vscode.workspace.getConfiguration().get("ask-gpt-vscode.apiKey");

const setApiKey = (apiKey) =>
  vscode.workspace
    .getConfiguration()
    .update("ask-gpt-vscode.apiKey", apiKey, true)
    .then(() => {
      // reload the extension
      vscode.commands.executeCommand("workbench.action.reloadWindow");
    });

module.exports = {
  setup,
  inputApiKey,
  isApiKeySetupComplete,
  getApiKey,
  apiKeyCommand,
};
