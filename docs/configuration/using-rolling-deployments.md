---
title: Using rolling deployments
---

# Using rolling deployments

When deploying to large numbers of hosts, you might prefer not to restart your services on every host at the same time.

Kamal's default is to boot new containers on all hosts in parallel. But you can control this by configuring `boot/limit` and `boot/wait` as options:

```yaml
service: myservice

boot:
  limit: 10 # Can also specify as a percentage of total hosts, such as "25%"
  wait: 2
```

When `limit` is specified, containers will be booted on, at most, `limit` hosts at once. Kamal will pause for `wait` seconds between batches.

These settings only apply when booting containers (using `kamal deploy`, or `kamal app boot`). For other commands, Kamal continues to run commands in parallel across all hosts.
