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
- `KAMAL_OUTPUT` — Path to the hook output file (see [Hook output](#hook-output) below)

**Note:** The [pre-configure](../pre-configure) hook runs before configuration is created. Only `KAMAL_DESTINATION` and `KAMAL_OUTPUT` are available to that hook; the other variables listed above are set for all subsequent hooks.

The available hooks are:

- [pre-configure](../pre-configure)
- [docker-setup](../docker-setup)
- [pre-connect](../pre-connect)
- [pre-build](../pre-build)
- [pre-deploy](../pre-deploy)
- [post-deploy](../post-deploy)
- [pre-app-boot](../pre-app-boot)
- [post-app-boot](../post-app-boot)
- [pre-proxy-reboot](../pre-proxy-reboot)
- [post-proxy-reboot](../post-proxy-reboot)

You can pass `--skip-hooks` to avoid running the hooks.

**Note:** The hook filename must be the hook name without any extension. For example, the [pre-deploy](../pre-deploy) hook should be named "pre-deploy" (without any file extension such as .sh or .rb).

## Hook output

Hooks can pass data back to Kamal by writing `KEY=VALUE` lines (dotenv format) to the file at `$KAMAL_OUTPUT`:

```bash
#!/bin/bash
echo "DEPLOY_SLOT=beta2" >> "$KAMAL_OUTPUT"
echo "KAMAL_MESSAGE=Claimed beta slot 2" >> "$KAMAL_OUTPUT"
```

This is similar to GitHub Actions' `$GITHUB_OUTPUT`. Hooks that don't write to this file behave identically to before.

### Special keys

- `KAMAL_DESTINATION` — When written by the [pre-configure](../pre-configure) hook, sets or rewrites the deployment destination.
- `KAMAL_MESSAGE` — Printed to the user after the hook completes, regardless of verbosity settings.

### Accumulation across hooks

Hook outputs accumulate across the deploy lifecycle. A `pre-deploy` hook that writes `DEPLOY_ID=123` makes `$DEPLOY_ID` available in the environment of subsequent hooks like `post-deploy`.

### Precedence

Hook outputs have the lowest precedence. They cannot override Kamal's built-in environment variables (`KAMAL_RECORDED_AT`, `KAMAL_VERSION`, etc.) or secrets.

## Hook PATH

When hooks execute, `.kamal/bin` is prepended to `$PATH` (if the directory exists). This means hooks can call project-local scripts by name without a full path:

```bash
#!/bin/bash
# .kamal/hooks/post-deploy — calls .kamal/bin/notify directly
notify "Deployed $KAMAL_SERVICE_VERSION to $KAMAL_DESTINATION"
```

The PATH is restored after each hook completes. See [External commands](/docs/configuration/external-commands/#hooks-and-kamalbin) for more on `.kamal/bin`.
