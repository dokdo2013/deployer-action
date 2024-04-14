const core = require("@actions/core");
const axios = require("axios");

async function run() {
  try {
    const apiUrl = core.getInput("api_url");
    const basePath = core.getInput("base_path");
    const deployToken = core.getInput("deploy_token");
    let scripts = core.getInput("scripts");

    core.info(`Scripts Type: ${typeof scripts}`);

    try {
      scripts = scripts.split("\n");
    } catch (error) {
      scripts = [scripts];
    }

    core.info(`Deploying to API URL: ${apiUrl}`);
    core.info(`Base Path: ${basePath}`);
    core.info(`Scripts: ${scripts}`);
    core.info(`Scripts Parse: ${JSON.stringify(scripts)}`);
    core.info(`Scripts Type: ${typeof scripts}`);

    const response = await axios.post(apiUrl, {
      token: deployToken,
      basePath,
      scripts,
    });

    core.info(`Deployment Success: ${response.data}`);
  } catch (error) {
    core.setFailed(`Deployment failed: ${error}`);

    // axios error handling
    core.error(`Error: ${JSON.stringify(error)}`);
    core.error(`Status: ${error.response.status}`);
    core.error(`Headers: ${JSON.stringify(error.response.headers)}`);
    core.error(`Config: ${JSON.stringify(error.config)}`);
    core.error(`Stack: ${error.stack}`);
  }
}

run();
