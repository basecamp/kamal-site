---
title: pre-traefik-reboot
---

# pre-traefik-reboot hook

Run before rebooting the Traefik container, when you call `kamal traefik reboot`.

If you have the hook disable the current server in an external load balancer and use the --rolling flag, you can
use this for a zero-downtime Traefik reboot.

With a rolling reboot hook will be called once for each server, with `KAMAL_HOSTS` containing the current server. With a non-rolling reboot it will be called just once.

Use the [post-traefik-reboot](../post-traefik-reboot) hook to re-enable the server.
