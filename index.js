/* 
 * Entrypoint for this workflow. Handles executive functions like iterating servers & more 
 * by @zudsniper & ChatGPT
*/
const core = require('@actions/core');
const { uploadFiles } = require('./upload_to_ptero');

async function run() {
  try {
    const apiKey = core.getInput('api-key');
    const pteroUrl = core.getInput('ptero-url');
    const serverIds = core.getInput('server-ids');
    const sendPath = core.getInput('send-path');
    const serverArray = serverIds.split(',');
    const filePaths = await uploadFiles(sendPath);

    console.log(`Uploading files to the following servers: ${serverArray}`);
    for (let i = 0; i < serverArray.length; i++) {
      const serverId = serverArray[i];
      console.log(`Uploading files to server ID: ${serverId}`);
      await uploadToServer(pteroUrl, serverId, apiKey, filePaths);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function uploadToServer(pteroUrl, serverId, apiKey, filePaths) {
  const axios = require('axios');
  const FormData = require('form-data');
  const fs = require('fs');

  try {
    const serverResponse = await axios({
      url: `${pteroUrl}/api/application/servers/${serverId}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // initialize server upload details
    const serverData = serverResponse.data.attributes;
    const { node, sftp_details } = serverData.relationships;
    const { ip, port } = node.attributes;
    const { username, password } = sftp_details.attributes;
    const uploadPath = sftp_details.attributes.directory;

    console.log(`Connecting to server ID: ${serverId}`);
    const conn = new Client();
    await conn.connect({
      host: ip,
      port: port,
      username: username,
      password: password
    });

    // provide progress bar output with upload process
    console.log(`Uploading files to directory: ${uploadPath}`);
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const fileName = path.basename(filePath);
      const fileStream = fs.createReadStream(filePath);
      const form = new FormData();
      form.append('file', fileStream, fileName);
      form.submit({
        host: ip,
        port: port,
        path: `${uploadPath}/${encodeURIComponent(fileName)}`,
        auth: `${username}:${password}`
      }, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File ${fileName} successfully uploaded to server ID ${serverId}`);
        }
      });
    }

    console.log(`Closing connection to server ID: ${serverId}`);
    await conn.end();
  } catch (error) {
    console.error(`Failed to upload files to server ID: ${serverId} (${error})`);
  }
}

// start the workflow 
run();
