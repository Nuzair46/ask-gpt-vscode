const { isApiKeySetupComplete } = require("./settings");

const chatPage = (question, answer) => `
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
				display: ${question || answer ? "block" : "none"};
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
        ? getWebviewContent(question, answer)
        : invalidSetup
    }
  </body>
</html>
`;

const getWebviewContent = (question, answer) => `
<div class="instructions">
  ${instructions}
</div>
<div class="chatbox">
  <div class="question">Q: ${question}</div>
  <div class="answer">A: ${answer}</div>
</div>
  `;

const instructions = `
<p>
  Ask GPT a question and it will answer it.<br>
  1. Use the command + shift + p and search for 'Ask GPT'.<br>
  2. Type your question in the input box.<br>
</p>`;

const invalidSetup = `
	<p>Looks like OpenAI API Key was not setup. <br>
	1. Copy the API key from <a href="https://platform.openai.com/account/api-keys" target="_blank">OpenAI</a>.<br>
	2. Set it up with command + shift + p and search for 'Set OpenAI API Key'.<br>
	3. Set the API key in the input box.
	</p>
`;

module.exports = {
  chatPage,
};
