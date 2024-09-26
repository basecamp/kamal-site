---
title: pre-proxy-reboot
---

# Hooks: pre-proxy-reboot

Run before rebooting the kamal-proxy container, when you call `kamal proxy reboot`.

If you have the hook disable the current server in an external load balancer and use the --rolling flag, you can use this for a zero-downtime proxy reboot.

With a rolling reboot hook will be called once for each server, with `KAMAL_HOSTS` containing the current server. With a non-rolling reboot it will be called just once.

Use the [post-proxy-reboot](../post-proxy-reboot) hook to re-enable the server.
