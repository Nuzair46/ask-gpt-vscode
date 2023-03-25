const { isApiKeySetupComplete } = require("./settings");

const chatPage = (history) => `
<!doctype html>
<html>
  <head>
    <style>
			body {
				background-color: #1c1a1a;
				border-radius: 5px;
			}
			.chatbox {
				padding: 10px;
				margin-top: 10px;
			}
      .question {
        font-weight: bold;
				border-radius: 5px;
				padding: 10px 5px;
				margin-bottom: 10px;
				background-color: #575958;
      }
      .answer {
        margin-top: 8px;
				background-color: #2d2e2d;
				border-radius: 5px;
				padding: 10px 5px;
        margin-bottom: 8px;
      }
      .instructions {
        margin-bottom: 8px;
				padding-x: 10px;
      }
			.instructions p {
				line-height: 1.5;
			}
    </style>
  </head>
  <body>
  	${
      isApiKeySetupComplete()
        ? getWebviewContent(history)
        : getInvalidSetupHtml()
    }
  </body>
</html>
`;

const getWebviewContent = (history) => `
<div class="instructions">
  ${getInstructionsHtml()}
</div>
${
  history.length > 0
    ? `
  <div class="chatbox">
    ${getMessagesHtml(history)}
  </div>
`
    : ""
}
`;

const getMessagesHtml = (history) =>
  history
    .map(
      (history) => `
    <div class="question">Q: ${history[0]}</div>
    <div class="answer">A: ${history[1]}</div>
  `
    )
    .join("");

const getInstructionsHtml = () => `
<p>
  Ask GPT a question and it will answer it.<br>
  1. Use the command + shift + p and search for 'Ask GPT'.<br>
  2. Type your question in the input box.<br>
</p>`;

const getInvalidSetupHtml = () => `
	<p>Looks like OpenAI API Key was not setup. <br>
	1. Copy the API key from <a href="https://platform.openai.com/account/api-keys" target="_blank">OpenAI</a>.<br>
	2. Set it up with command + shift + p and search for 'Set OpenAI API Key'.<br>
	3. Set the API key in the input box.
	</p>
`;

module.exports = {
  chatPage,
};
