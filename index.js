const core = require("@actions/core");
const axios = require("axios");

async function run() {
  try {
    const apiUrl = core.getInput("api_url");
    const basePath = core.getInput("base_path");
    const deployToken = core.getInput("deploy_token");
    let scripts = core.getInput("scripts");

    try {
      scripts = JSON.parse(scripts);
    } catch (error) {
      scripts = [scripts];
    }

    console.log("API URL:", apiUrl);
    console.log("Base Path:", basePath);
    console.log("Scripts:", scripts);

    const response = await axios.post(apiUrl, {
      token: deployToken,
      basePath,
      scripts,
    });

    console.log("Deployment Success:", response.data);
  } catch (error) {
    core.setFailed(`Deployment failed: ${error}`);
    core.error(error);
  }
}

run();
