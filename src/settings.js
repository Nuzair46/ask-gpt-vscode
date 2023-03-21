const vscode = require("vscode");

const settings = async () => {
  if (!isApiKeySetupComplete()) {
    await inputApiKey();
  }
};

const inputApiKey = async () =>
  await vscode.window
    .showInputBox({
      prompt: "Enter OpenAI API Key",
      placeHolder: "sk-************************************",
    })
    .then((apiKey) => {
      if (apiKey) {
        setApiKey(apiKey);
      }
    });

const isApiKeySetupComplete = () => {
  const apiKey = getApiKey();

  return apiKey.length > 0 && apiKey;
};

const getApiKey = () =>
  vscode.workspace.getConfiguration().get("ask-gpt-vscode.apiKey");

const setApiKey = (apiKey) =>
  vscode.workspace
    .getConfiguration()
    .update("ask-gpt-vscode.apiKey", apiKey, true);

module.exports = { settings, inputApiKey, isApiKeySetupComplete };
