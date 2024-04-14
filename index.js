const core = require("@actions/core");
const axios = require("axios");

async function run() {
  try {
    const apiUrl = core.getInput("api_url");
    const basePath = core.getInput("base_path");
    const deployToken = core.getInput("deploy_token");
    const scripts = core.getInput("scripts");

    const response = await axios.post(apiUrl, {
      token: deployToken,
      basePath,
      scripts: JSON.parse(scripts), // scripts는 JSON 문자열로 가정
    });

    console.log("Deployment Success:", response.data);
  } catch (error) {
    core.setFailed(`Deployment failed: ${error}`);
  }
}

run();
