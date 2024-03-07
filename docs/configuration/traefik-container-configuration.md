---
title: Traefik container configuration
---

# Traefik container configuration

Pass additional Docker configuration for the Traefik container using `options`:

```yaml
traefik:
  options:
    publish:
      - 8080:8080
    volume:
      - /tmp/example.json:/tmp/example.json
    memory: 512m
```

This starts the Traefik container with `--volume /tmp/example.json:/tmp/example.json --publish 8080:8080 --memory 512m` arguments to `docker run`.
