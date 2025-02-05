---
title: pre-app-boot
---

# Hooks: pre-app-boot

Run before booting the app container when you call `kamal app boot`, or indirectly via `kamal deploy`.

With a grouped boot strategy, the hook will be called once for each group, with `KAMAL_HOSTS` containing a list of servers in the group.

The [post-app-boot](../post-app-boot) will be called after the boot completes, again once per deployment group.
