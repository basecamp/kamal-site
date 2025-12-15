---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/boot.yml in the Kamal repository.
title: Booting
---

# Booting

When deploying to large numbers of hosts, you might prefer not to restart your services on every host at the same time.

Kamal’s default is to boot new containers on all hosts in parallel. However, you can control this with the boot configuration.


```yaml
boot:
```

## [The number or percentage of hosts to boot at a time.](#the-number-or-percentage-of-hosts-to-boot-at-a-time.)
This can be an integer (e.g., 3) or a percentage string (e.g., 25%).

```yaml
  limit: 25%
```

## [The number of seconds to wait between booting each group of hosts.](#the-number-of-seconds-to-wait-between-booting-each-group-of-hosts.)

```yaml
  wait: 10
```

## [Whether to boot roles in parallel on a host.](#whether-to-boot-roles-in-parallel-on-a-host.)

If a host has multiple roles, control whether they are booted in parallel or sequentially on that host.

Defaults to false.

```yaml
  parallel_roles: true
```
