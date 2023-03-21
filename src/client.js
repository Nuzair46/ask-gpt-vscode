const { Configuration, OpenAIApi } = require("openai");
const vscode = require("vscode");
const { getApiKey } = require("./settings");

const configuration = new Configuration({
  apiKey: getApiKey(),
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (question) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    const completion_text = completion.data.choices[0].message.content;
    return completion_text;
  } catch (err) {
    vscode.window.showInformationMessage("error" + err);
  }
};

module.exports = { getCompletion };
