const vscode = require("vscode");

const initializeExtension = () => {
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

const setApiKey = (apiKey) => {
  const config = vscode.workspace.getConfiguration();
  return config.update("ask-gpt-vscode.apiKey", apiKey, true).then(() => {
    vscode.commands.executeCommand("workbench.action.reloadWindow");
  });
};

module.exports = {
  initializeExtension,
  inputApiKey,
  isApiKeySetupComplete,
  getApiKey,
  apiKeyCommand,
};
