# `ptero-sync`
### _github action to upload your basefile repository contents into your pterodactyl.io server suite as specified._
_by [@zudsniper](https://github.com/zudsniper)_ & [`ChatGPT`](https://chat.openai.com/chat)  

A GitHub Action that synchronizes files to one or more Pterodactyl game servers using the Pterodactyl API.  
<br>
[![Release](https://github.com/zodtf/ptero-sync/workflows/Release/badge.svg)](https://github.com/zodtf/ptero-sync/workflows/release.yaml)  ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/zodtf/ptero-sync?include_prereleases)  ![GitHub commit activity](https://img.shields.io/github/commit-activity/y/zodtf/ptero-sync?color=446614)  [![GitHub](https://img.shields.io/github/license/zodtf/ptero-sync)](https://github.com/zodtf/ptero-sync/blob/master/LICENSE)  

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

<hr>

<i><code>zod.tf</code></i> 

![GitHub package.json version](https://img.shields.io/github/package-json/v/zodtf/ptero-sync?color=FF67F2)  ![Discord](https://img.shields.io/discord/974855479975100487)  ![GitHub followers](https://img.shields.io/github/followers/zudsniper?style=social) 

> _fullstack development, server administration, web design, branding creation, musical scoring, video editing, and idk another thing_   

<a href="https://zod.tf/"><img src="https://user-images.githubusercontent.com/16076573/222953031-03f44756-03bf-46b9-b66e-98d50dc013fc.png" alt="second zod.tf logo" width="150rem" style="max-width: 100%;"></a>
