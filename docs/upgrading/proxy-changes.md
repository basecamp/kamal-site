---
title: Replacing Traefik with kamal-proxy
---

# Proxy changes

Kamal uses a proxy for gapless deployments.

In Kamal 1, we used [Traefik](https://traefik.io/traefik), but for version 2, we are using a [kamal-proxy](https://github.com/basecamp/kamal-proxy).

It is a custom proxy called built specifically for Kamal.

## [Why we are dropping Traefik](#dropping-traefik)

### Imperative vs Declarative

Traefik is not a great fit for Kamal. Kamal is an imperative tool, while Traefik is declarative.

This means that we need to ask Traefik to do things, and then poll it to see when it's done.

### Labels

We used Traefik's [Docker provider](https://doc.traefik.io/traefik/providers/docker/). It involves adding labels to
containers, which Traefik uses to configure itself.

It is flexible and there are a lot of options for things you can do with the labels. But it makes the configuration
complicated and requires that you understand Traefik's general purpose configuration even to accomplish simple tasks.

Container labels are immutable, so you can't tell Traefik to stop routing requests. To successfully drain containers,
we had to resort to modifying healthchecks so we could force the container's into an unhealthy state.

### Overly flexible

Using Traefik labels, it is possible to to a lot of things. Kamal's users had used that to get it to do things
it was not initially designed to do, like Let's Encrypt integration, or running multiple application on one server.

Doing this was complicated and error prone though, and we wanted to provide simpler built solutions for those common requirements.

### Hard to understand errors

Traefik has its own domain language - Routers, Services, Endpoints. So if it failed the errors would be in that
language and disconnected from what Kamal was doing making it tricky to diagnose failures.

### Other options

There are other proxies available, and Traefik has other configuration options, such as the file provider.

However as we looked at how we want to evolve Kamal it became clear that building our own proxy would give us
the control we needed to efficiently build and develop those new features.

We want an imperative tool that has a 1-1 mapping between kamal commands and proxy commands. We want to tell the
proxy what to do, and have it do what we asked and return when its done. If it fails the failure should be clear.

## [kamal-proxy](#kamal-proxy)

[kamal-proxy](https://github.com/basecamp/kamal-proxy) is written in Go.

It has minimal configuration so that we can run multiple application against a single proxy without configuration
clashes.

Instead configuration (timeouts, logging, buffering etc) is supplied via commands at deploy time and only applies to
the application being deployed.

It uses blocking commands, so when you deploy the command will respond when the deployment is complete.

It has support for:
- Automatic TLS via Let's Encrypt
- Host based routing
- Request and response buffering
- Maximum requests and response sizes

And coming soon to Kamal:
- Pausing requests
- Maintanence mode
- Gradual rollouts

The proxy is distributed as a container via [Docker Hub](https://hub.docker.com/repository/docker/basecamp/kamal-proxy).

Kamal will ensure that a compatible version is in place before deploying.
