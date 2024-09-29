---
title: Network changes
---

# Kamal 2: Network changes

`kamal-proxy` needs a stable hostname for the container that it is routing to. This is so that it can identify and route traffic to the container across restarts.

Using the default `bridge` network, application containers are assigned IP addresses, but they are not stable across restarts.

So instead, we will create and use a custom network called `kamal`.

If you have custom requirements for your network, you can create the `kamal` network yourself before deploying with Kamal, or use a `docker-setup` hook to configure the network when running `kamal setup`.

Accessories will also run from within the `kamal` network.
