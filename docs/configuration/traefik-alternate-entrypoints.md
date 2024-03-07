---
title: Traefik alternate entrypoints
---

# Traefik alternate entrypoints

You can configure multiple entrypoints for Traefik like so:

```yaml
service: myservice

labels:
  traefik.tcp.routers.other.rule: 'HostSNI(`*`)'
  traefik.tcp.routers.other.entrypoints: otherentrypoint
  traefik.tcp.services.other.loadbalancer.server.port: 9000
  traefik.http.routers.myservice.entrypoints: web
  traefik.http.services.myservice.loadbalancer.server.port: 8080

traefik:
  options:
    publish:
      - 9000:9000
  args:
    entrypoints.web.address: ':80'
    entrypoints.otherentrypoint.address: ':9000'
```
