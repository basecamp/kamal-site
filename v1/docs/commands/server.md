---
title: Server
---

# kamal server

```bash
$ kamal server
Commands:
  kamal server bootstrap       # Set up Docker to run Kamal apps
  kamal server exec            # Run a custom command on the server (use --help to show options)
  kamal server help [COMMAND]  # Describe subcommands or one specific subcommand
```

## [Bootstrap server](#bootstrap-server)

You can run `kamal server bootstrap` to setup Docker on your hosts.

It will check if Docker is installed and if not it will attempt to install it via [get.docker.com](https://get.docker.com/).

```bash
$ kamal server bootstrap
```

## [Execute command on all servers](#execute-command-on-all-servers)

Run a custom command on all servers.

```bash
$ kamal server exec "date"
Running 'date' on 867.53.0.9...
  INFO [e79c62bb] Running /usr/bin/env date on 867.53.0.9
  INFO [e79c62bb] Finished in 0.247 seconds with exit status 0 (successful).
App Host: 867.53.0.9
Thu Jun 13 08:06:19 AM UTC 2024
```

## [Execute command on primary server](#execute-command-on-primary-server)

Run a custom command on the primary server.

```bash
$ kamal server exec --primary "date"
Running 'date' on 867.53.0.9...
  INFO [8bbeb21a] Running /usr/bin/env date on 867.53.0.9
  INFO [8bbeb21a] Finished in 0.265 seconds with exit status 0 (successful).
App Host: 867.53.0.9
Thu Jun 13 08:07:09 AM UTC 2024
```

## [Execute interactive command on server](#execute-interactive-command-on-server)

Run an interactive command on the server.

```bash
$ kamal server exec --interactive "/bin/bash"
Running '/bin/bash' on 867.53.0.9 interactively...
root@server:~#
```
