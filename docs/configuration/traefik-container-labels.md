---
title: Traefik container labels
---

# Traefik container labels

Add labels to Traefik Docker container.

```yaml
traefik:
  labels:
    traefik.enable: true
    traefik.http.routers.dashboard.rule: Host(`traefik.example.com`) && (PathPrefix(`/api`) || PathPrefix(`/dashboard`))
    traefik.http.routers.dashboard.service: api@internal
    traefik.http.routers.dashboard.middlewares: auth
    traefik.http.middlewares.auth.basicauth.users: test:$2y$05$H2o72tMaO.TwY1wNQUV1K.fhjRgLHRDWohFvUZOJHBEtUXNKrqUKi # test:password
```

This labels Traefik container with `--label traefik.http.routers.dashboard.middlewares=\"auth\"` and so on.
