---
title: Servers
---

# Servers

Servers are split into different roles, with each role having its own configuration.

For simpler deployments, though, where all servers are identical, you can just specify a list of servers. They will be implicitly assigned to the `web` role.

```yaml
servers:
  - 172.0.0.1
  - 172.0.0.2
  - 172.0.0.3
```

## [Tagging servers](#tagging-servers)

Servers can be tagged, with the tags used to add custom env variables (see [Environment variables](../environment-variables)).

```yaml
servers:
  - 172.0.0.1
  - 172.0.0.2: experiments
  - 172.0.0.3: [ experiments, three ]
```

## [Roles](#roles)

For more complex deployments (e.g., if you are running job hosts), you can specify roles and configure each separately (see [Roles](../roles)):

```yaml
servers:
  web:
    ...
  workers:
    ...
```
