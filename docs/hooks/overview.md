---
title: Hooks overview
---

# Hooks overview

You can run custom scripts at specific points with hooks.

Hooks should be stored in the **.kamal/hooks** folder. Running `kamal init` will build that folder and add some sample scripts.

You can change their location by setting `hooks_path` in the configuration file.

If the script returns a non-zero exit code, the command will be aborted.

`KAMAL_*` environment variables are available to the hooks command for fine-grained audit reporting, e.g., for triggering deployment reports or firing a JSON webhook. These variables include:

- `KAMAL_RECORDED_AT` — UTC timestamp in ISO 8601 format, e.g., `2023-04-14T17:07:31Z`
- `KAMAL_PERFORMER` — The local user performing the command (from `whoami`)
- `KAMAL_SERVICE` — The service name, e.g., app
- `KAMAL_SERVICE_VERSION` — An abbreviated service and version for use in messages, e.g., app@150b24f
- `KAMAL_VERSION` — The full version being deployed
- `KAMAL_HOSTS` — A comma-separated list of the hosts targeted by the command
- `KAMAL_COMMAND` — The command we are running
- `KAMAL_SUBCOMMAND` — _Optional:_ The subcommand we are running
- `KAMAL_DESTINATION` — _Optional:_ Destination, e.g., "staging"
- `KAMAL_ROLE` — _Optional:_ Role targeted, e.g., "web"

The available hooks are:

- [docker-setup](../docker-setup)
- [pre-connect](../pre-connect)
- [pre-build](../pre-build)
- [pre-deploy](../pre-deploy)
- [post-deploy](../post-deploy)
- [pre-app-boot](../pre-app-boot)
- [post-app-boot](../post-app-boot)
- [pre-proxy-reboot](../pre-proxy-reboot)
- [post-proxy-reboot](../post-proxy-reboot)

You can pass `--skip_hooks` to avoid running the hooks.

**Note:** The hook filename must be the hook name without any extension. For example, the [pre-deploy](../pre-deploy) hook should be named "pre-deploy" (without any file extension such as .sh or .rb).
