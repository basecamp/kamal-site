---
title: Hooks
---

# Hooks

You can run custom scripts at specific points with hooks.

Hooks should be stored in the **.kamal/hooks** folder. Running `kamal init` will build that folder and add some sample scripts.

You can change their location by setting `hooks_path` in the configuration file.

If the script returns a non-zero exit code the command will be aborted.

`KAMAL_*` environment variables are available to the hooks command for fine-grained audit reporting, e.g. for triggering deployment reports or firing a JSON webhook. These variables include:

- `KAMAL_RECORDED_AT` — UTC timestamp in ISO 8601 format, e.g. `2023-04-14T17:07:31Z`
- `KAMAL_PERFORMER` — The local user performing the command (from `whoami`)
- `KAMAL_SERVICE_VERSION` — An abbreviated service and version for use in messages, e.g. app@150b24f
- `KAMAL_VERSION` — The full version being deployed
- `KAMAL_HOSTS` — A comma-separated list of the hosts targeted by the command
- `KAMAL_COMMAND` — The command we are running
- `KAMAL_SUBCOMMAND` — *Optional:* The subcommand we are running
- `KAMAL_DESTINATION` — *Optional:* Destination, e.g. "staging"
- `KAMAL_ROLE` — *Optional:* Role targeted, e.g. "web"

## [docker-setup](#docker-setup)
Run once Docker is installed on a server but before taking any application-specific actions. Designed for performing any necessary configuration of Docker itself.

## [pre-connect](#pre-connect)

Called before taking the deploy lock. For checks that need to run before connecting to remote hosts, e.g. DNS warming.

## [pre-build](#pre-build)

Used for pre-build checks, e.g. there are no uncommitted changes or that CI has passed.

## [pre-deploy](#pre-deploy)

For final checks before deploying, e.g. checking CI completed.

## [post-deploy](#post-deploy)

Run after a deploy, redeploy or rollback. This hook is also passed a `KAMAL_RUNTIME` env variable set to the total seconds the deploy took.

This could be used to broadcast a deployment message, or register the new version with an APM.

The command could look something like:

```bash
#!/usr/bin/env bash
curl -q -d content="[My App] ${KAMAL_PERFORMER} Rolled back to version ${KAMAL_VERSION}" https://3.basecamp.com/XXXXX/integrations/XXXXX/buckets/XXXXX/chats/XXXXX/lines
```

That will post a line like the following to a preconfigured chatbot in Basecamp:

```
[My App] [dhh] Rolled back to version d264c4e92470ad1bd18590f04466787262f605de
```

Set `--skip_hooks` to avoid running the hooks.
