const { Configuration, OpenAIApi } = require("openai");
const vscode = require("vscode");
const { getApiKey } = require("./settings");

const configuration = new Configuration({
  apiKey: getApiKey(),
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (messages) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const completion_text = completion.data.choices[0].message.content;
    return completion_text;
  } catch (error) {
    vscode.window.showErrorMessage(
      `Unable to get answer from OpenAI: ${error.message}`
    );
    return null;
  }
};

module.exports = { getCompletion };
