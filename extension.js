const { panelView, questionCommand } = require("./src/sidePanel");
const { initializeExtension, apiKeyCommand } = require("./src/settings");

const activate = (context) => {
  initializeExtension();
  context.subscriptions.push(apiKeyCommand);
  context.subscriptions.push(questionCommand);
  context.subscriptions.push(panelView);
};

// This method is called when your extension is deactivated
const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
