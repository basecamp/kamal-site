---
title: Setup
---

# kamal setup

Kamal setup will run everything required to deploy an application to a fresh host.

It will:
1. Install docker on all servers, if it has permission and it is not already installed
2. Push env files to the hosts (you may need to run [`kamal envify`](../envify) to generate `.env` first)
3. Boot all accessories
4. Deploy the app (see [`kamal deploy`](../deploy))
