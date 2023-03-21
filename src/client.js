import { ChatGPTAPI } from "chatgpt";
import { getApiKey } from "./settings";

const api = new ChatGPTAPI({
  apiKey: getApiKey(),
});

const getCompletion = async (question) => {
  const res = await api.sendMessage(question);
  return res.text;
};

module.exports = { getCompletion };
