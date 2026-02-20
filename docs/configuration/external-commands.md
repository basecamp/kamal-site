---
title: External commands
---

# External commands

Kamal can be extended with external commands. When you run `kamal foo` and `foo` is not a built-in command or alias, Kamal looks for an external command to run instead.

## [Lookup order](#lookup-order)

1. **Project-local**: `.kamal/bin/foo` in the current working directory
2. **System-wide**: `kamal-foo` anywhere on your `$PATH`

The first match wins. If neither is found, Kamal reports the usual "Could not find command" error.

## [Writing an external command](#writing-an-external-command)

An external command is any executable file. Kamal replaces its own process with the command (`exec`), so it behaves as if you ran the script directly — no Kamal configuration is loaded, no hooks fire, no locks are acquired.

```bash
#!/bin/bash
# .kamal/bin/claims — list destination leases
echo "Active leases:"
git for-each-ref refs/kamal/destinations/
```

```shell
chmod +x .kamal/bin/claims
kamal claims
```

Arguments after the command name are forwarded:

```shell
kamal claims release beta2   # runs: .kamal/bin/claims release beta2
```

## [Built-in commands take precedence](#built-in-commands-take-precedence)

External commands never shadow built-in commands or aliases. If `deploy` is both a built-in and a `.kamal/bin/deploy`, the built-in always wins — even with unambiguous prefix matching (`kamal dep` resolves to `deploy`, not an external `dep`).

## [System-wide commands](#system-wide-commands)

Place a `kamal-<name>` executable on your `$PATH` to make it available across all projects:

```shell
# /usr/local/bin/kamal-dashboard
#!/bin/bash
open "https://dashboard.example.com"
```

```shell
kamal dashboard   # opens the URL
```

Project-local commands (`.kamal/bin/`) take priority over system-wide commands with the same name.

## [Hooks and .kamal/bin](#hooks-and-kamalbin)

During [hook execution](/docs/hooks/overview/), `.kamal/bin` is prepended to `$PATH`. This means hooks can call project-local commands without specifying the full path:

```bash
#!/bin/bash
# .kamal/hooks/post-deploy — calls .kamal/bin/notify directly
notify "Deploy complete: $KAMAL_SERVICE_VERSION"
```

See [Hook PATH](/docs/hooks/overview/#hook-path) for details.
