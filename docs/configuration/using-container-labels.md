---
title: Using container labels
---

# Using container labels

You can specialize the default Traefik rules by setting labels on the containers that are being started:

```yaml
labels:
  traefik.http.routers.hey-web.rule: Host(`app.hey.com`)
```
Traefik rules are in the "service-role-destination" format. The default role will be `web` if no rule is specified. If the destination is not specified, it is not included. To give an example, the above rule would become "traefik.http.routers.hey-web-staging.rule" if it was for the "staging" destination.

**Note:** The backticks are needed to ensure the rule is passed in correctly and not treated as command substitution by Bash!

This allows you to run multiple applications on the same server sharing the same Traefik instance and port. See [doc.traefik.io](https://doc.traefik.io/traefik/routing/routers/#rule) for a full list of available routing rules.

The labels can also be applied on a per-role basis:

```yaml
servers:
  web:
    - 192.168.0.1
    - 192.168.0.2
  job:
    hosts:
      - 192.168.0.3
      - 192.168.0.4
    cmd: bin/jobs
    labels:
      my-label: "50"
```
