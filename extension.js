const { panelView } = require("./src/panelView");
const { settingsView } = require("./src/settingsView");

const activate = (context) => {
  context.subscriptions.push(panelView);
  context.subscriptions.push(settingsView);
};

// This method is called when your extension is deactivated
const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
