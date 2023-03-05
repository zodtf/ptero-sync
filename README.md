# `ptero-sync`
### _github action to upload your basefile repository contents into your pterodactyl.io server suite as specified._
_by [@zudsniper](https://github.com/zudsniper)_ & [`ChatGPT`](https://chat.openai.com/chat)_  

[![Release](https://github.com/zodtf/ptero-sync/actions/workflows/release.yaml/badge.svg?branch=master&event=release)](https://github.com/zodtf/ptero-sync/actions/workflows/release.yaml)  

A GitHub Action that synchronizes files to one or more Pterodactyl game servers using the Pterodactyl API.

## Usage

To use this action in a workflow, include the following step:

```yaml
- name: Sync to Pterodactyl game servers
  uses: USERNAME/REPOSITORY@v1
  with:
    api_key: ${{ secrets.PTERODACTYL_API_KEY }}
    ptero_url: ${{ secrets.PTERODACTYL_URL }}
    send_path: 'path/to/files'
    server_ids: '1,2,3'
```

This will upload all files within the path/to/files directory to the game servers with IDs 1, 2, and 3, using the API key and Pterodactyl URL specified in the GitHub repository secrets.

## Inputs
<table><thead><tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>api_key</code></td><td>Yes</td><td>None</td><td>The Pterodactyl API key</td></tr><tr><td><code>ptero_url</code></td><td>Yes</td><td>None</td><td>The Pterodactyl panel URL</td></tr><tr><td><code>send_path</code></td><td>Yes</td><td>None</td><td>The path of the files to send</td></tr><tr><td><code>server_ids</code></td><td>Yes</td><td>None</td><td>A comma-separated list of Pterodactyl server IDs to send files to</td></tr></tbody></table>

## Examples
### Sync files on Push
This workflow will synchronize files to the specified Pterodactyl game servers when code is pushed to the repository:

```yaml
name: Sync to Pterodactyl game servers
on:
  push:
    branches:
      - main
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync to Pterodactyl game servers
        uses: USERNAME/REPOSITORY@v1
        with:
          api_key: ${{ secrets.PTERODACTYL_API_KEY }}
          ptero_url: ${{ secrets.PTERODACTYL_URL }}
          send_path: 'path/to/files'
          server_ids: '1,2,3'
```

### Sync files on tag
This workflow will synchronize files to the specified Pterodactyl game servers when a new tag is created:

```yaml
name: Sync to Pterodactyl game servers
on:
  push:
    tags:
      - '*'
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync to Pterodactyl game servers
        uses: USERNAME/REPOSITORY@v1
        with:
          api_key: ${{ secrets.PTERODACTYL_API_KEY }}
          ptero_url: ${{ secrets.PTERODACTYL_URL }}
          send_path: 'path/to/files'
```
