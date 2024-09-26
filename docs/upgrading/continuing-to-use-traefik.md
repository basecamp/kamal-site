---
title: "Kamal 2: Continuing to use Traefik"
---

# Kamal 2: Continuing to use Traefik

Kamal 2 requires kamal-proxy, but it's possible to continue to use Traefik if required.

You can run it as a Kamal accessory, and route requests through it and then on to kamal-proxy.

## Set the kamal-proxy boot config

We'll need to change kamal-proxy's default boot config so that:

1. It doesn't publish ports on the host
1. It adds the labels Traefik needs to route requests to it

Add a [pre-deploy hook](../../hooks/pre-deploy) for Traefik to pick up:

```shell
#!/bin/sh
kamal proxy boot_config set \
  --publish false \
  --docker_options label=traefik.http.services.kamal_proxy.loadbalancer.server.scheme=http \
                   label=traefik.http.routers.kamal_proxy.rule=PathPrefix\(\`/\`\)
```

You can add the `kamal proxy boot_config set` command to a [pre-deploy hook](../../hooks/pre-deploy). This will ensure that it is set correctly when deploying to a host for the first time.

## Create the accessory

Add Traefik as an accessory to `config/deploy.yml`, binding to the host port.

```yaml
accessories:
  traefik:
    service: traefik
    image: traefik:v2.10
    port: 80
    cmd: "--providers.docker"
    options:
      volume:
        - "/var/run/docker.sock:/var/run/docker.sock"
    roles:
      - web
```

## Running with Traefik

When you call `kamal setup`, it will boot the Traefik accessory, call the pre-deploy hook to update kamal-proxy's boot config and then boot kamal-proxy and the app.

Requests will flow from Traefik to kamal-proxy to your app.

```
$ docker ps
CONTAINER ID   IMAGE                                                                     COMMAND                  CREATED              STATUS              PORTS                               NAMES
3729c50d9d94   registry:4443/app_with_traefik:30482914d55f9ca5e4302dd2d050e424d29d8f74   "/docker-entrypoint.…"   11 seconds ago       Up 10 seconds       80/tcp                              app_with_traefik-web-30482914d55f9ca5e4302dd2d050e424d29d8f74
3c87e1c649e3   basecamp/kamal-proxy:v0.4.0                                               "kamal-proxy run"        12 seconds ago       Up 11 seconds       80/tcp, 443/tcp                     kamal-proxy
609a18d8ecd7   traefik:v2.10                                                             "/entrypoint.sh --pr…"   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp, :::80->80/tcp   traefik
```

## Switching on a host already running kamal-proxy

If you are already running kamal-proxy, you'll need to:

1. Manually run the `kamal proxy boot_config set` command from the deploy hook
2. Run `kamal proxy reboot` to pick up those boot config changes
3. Run `kamal accessory boot traefik` to start Traefik
