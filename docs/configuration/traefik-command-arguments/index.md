---
title: Traefik command arguments
---

# Traefik command arguments

Customize the Traefik command line using `args`:

```yaml
traefik:
  args:
    accesslog: true
    accesslog.format: json
```

This starts the Traefik container with `--accesslog=true --accesslog.format=json` arguments.
