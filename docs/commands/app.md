---
title: App
---

# kamal app

Run `kamal app` to manage your running apps.

To deploy new versions of the app, see `kamal deploy` and `kamal rollback`.

You can use `kamal app exec` to [run commands on servers](../running-commands-on-servers).

```bash
$ kamal app
Commands:
  kamal app boot              # Boot app on servers (or reboot app if already running)
  kamal app containers        # Show app containers on servers
  kamal app details           # Show details about app containers
  kamal app exec [CMD...]     # Execute a custom command on servers within the app container (use --help to show options)
  kamal app help [COMMAND]    # Describe subcommands or one specific subcommand
  kamal app images            # Show app images on servers
  kamal app live              # Set the app to live mode
  kamal app logs              # Show log lines from app on servers (use --help to show options)
  kamal app maintenance       # Set the app to maintenance mode
  kamal app remove            # Remove app containers and images from servers
  kamal app stale_containers  # Detect app stale containers
  kamal app start             # Start existing app container on servers
  kamal app stop              # Stop app container on servers
  kamal app version           # Show app version currently running on servers
```

## [Maintenance Mode](#maintenance-mode)

You can set your application to maintenance mode, by running `kamal app maintenance`.

When in maintenance mode, kamal-proxy will intercept requests and return a 503 responses.

There is a built in HTML template for the error page. You can customise the error message
via the --message option:

```shell
$ kamal app maintenance --message "Scheduled maintenance window from ..."
```

You can also provide custom error pages by setting the [`error_pages_path`](../../configuration/overview#error-pages) configuration option.

## [Live Mode](#live-mode)

You can set your application back to live mode, by running `kamal app live`.
