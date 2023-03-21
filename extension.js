const { panelView } = require("./src/panelView");
const { settings } = require("./src/settings");

const activate = (context) => {
  settings();
  context.subscriptions.push(panelView);
};

// This method is called when your extension is deactivated
const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
