---
title: post-deploy
---

# Hooks: post-deploy

Run after a deploy, redeploy, or rollback. This hook is also passed a `KAMAL_RUNTIME` env variable set to the total seconds the deploy took.

This could be used to broadcast a deployment message or register the new version with an APM.

The command could look something like:

```bash
#!/usr/bin/env bash
curl -q -d content="[My App] ${KAMAL_PERFORMER} Rolled back to version ${KAMAL_VERSION}" https://3.basecamp.com/XXXXX/integrations/XXXXX/buckets/XXXXX/chats/XXXXX/lines
```

That will post a line like the following to a preconfigured chatbot in Basecamp:

```
[My App] [dhh] Rolled back to version d264c4e92470ad1bd18590f04466787262f605de
```
