---
title: Traefik host port binding
---

# Traefik host port binding

Traefik binds to port 80 by default. Specify an alternative port using `host_port`:

```yaml
traefik:
  host_port: 8080
```

Alternatively, set `publish` to `false` to prevent binding to a host port. This can be useful if you are running Traefik behind a reverse proxy, for example:
```yaml
traefik:
  publish: false
```
