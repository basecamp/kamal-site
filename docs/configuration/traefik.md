---
title: Traefik
---

# Traefik

## [Traefik command arguments](#traefik-command-arguments)

Customize the Traefik command line using `args`:

```yaml
traefik:
  args:
    accesslog: true
    accesslog.format: json
```

This starts the Traefik container with `--accesslog=true --accesslog.format=json` arguments.

## [Traefik host port binding](#traefik-host-port-binding)

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

## [Traefik version, upgrades, and custom images](#traefik-version-upgrades-and-custom-images)

Kamal runs the traefik:v2.9 image to track Traefik 2.9.x releases.

To pin Traefik to a specific version or an image published to your registry, specify `image`:

```yaml
traefik:
  image: traefik:v2.10.0-rc1
```

This is useful for downgrading Traefik if there's an unexpected breaking change in a minor version release, upgrading Traefik to test forthcoming releases, or running your own Traefik-derived image.

Kamal has not been tested for compatibility with Traefik 3 betas. Please do!

## [Traefik container configuration](#traefik-container-configuration)

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

## [Traefik container labels](#traefik-container-labels)

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

## [Traefik alternate entrypoints](#traefik-alternate-entrypoints)

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
