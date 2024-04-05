---
title: Traefik
---

# kamal traefik

Kamal uses [Traefik](https://traefik.io/traefik/) to proxy requests to the application containers, allowing us to have zero-downtime deployments.

```bash
$ kamal traefik
Commands:
  kamal traefik boot            # Boot Traefik on servers
  kamal traefik details         # Show details about Traefik container from servers
  kamal traefik help [COMMAND]  # Describe subcommands or one specific subcommand
  kamal traefik logs            # Show log lines from Traefik on servers
  kamal traefik reboot          # Reboot Traefik on servers (stop container, remove container, start new container)
  kamal traefik remove          # Remove Traefik container and image from servers
  kamal traefik restart         # Restart existing Traefik container on servers
  kamal traefik start           # Start existing Traefik container on servers
  kamal traefik stop            # Stop existing Traefik container on servers
```

When you want to upgrade Traefik, or change it's configuration, you can call `kamal traefik reboot`. This is cause a small outage on each server and will prompt for confirmation.

You can use a rolling reboot with `kamal traefik reboot --rolling` to avoid restarting on all servers simultaneously.
