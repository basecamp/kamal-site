---
title: Proxy Changes
---

# Kamal 2: Proxy Changes

In Kamal 1, we used [Traefik](https://traefik.io/traefik) to enable gapless deployments.

For version 2, we are using [kamal-proxy](https://github.com/basecamp/kamal-proxy), a custom proxy built specifically for Kamal.

## [Why we are dropping Traefik](#dropping-traefik)

### Imperative vs. Declarative

Traefik is not a great fit for Kamal. Kamal is an imperative tool, while Traefik is declarative.

This means that we need to ask Traefik to do things, and then poll it to see when it's done.

### Labels

We used Traefik's Docker provider. It requires adding labels to containers, which Traefik uses to configure itself.

It is flexible, and there are a lot of options for things you can do with the labels. But it requires that you understand and use Traefik's [general purpose configuration](https://doc.traefik.io/traefik/providers/docker/) even to accomplish simple tasks.

Container labels are immutable, so you can't tell Traefik to stop routing requests. To successfully drain containers, we had to resort to modifying health checks to force the containers into an unhealthy state.

### Overly flexible

Using Traefik labels, it is possible to get Kamal to do things it was not initially designed to do, like integrating Let's Encrypt or running multiple applications on one server.

These use cases were unsupported and error-prone, though, and we wanted to provide simpler built solutions for those common requirements.

### Hard to understand errors

Traefik has its own domain language — Routers, Services, EntryPoints. So if it failed, the errors would be in that language and disconnected from what Kamal was doing. This made it tricky to diagnose failures.

### Other options

There are other proxies available, and Traefik has other configuration options, such as the file provider.

However, to evolve Kamal, it became clear that building our own proxy would give us the control we needed to efficiently build and develop new features.

We wanted:

- An imperative proxy — i.e., no polling
- A 1-to-1 mapping between Kamal commands and proxy commands
- Clear error messages
- Support for new commands
- Deploy-time rather than boot-time config, so we can change it without restarting

It was clear that to achieve this, we'd need to build the proxy ourselves.

## [kamal-proxy](#kamal-proxy)

[kamal-proxy](https://github.com/basecamp/kamal-proxy) is written in Go.

It has minimal configuration so that we can run multiple applications against a single proxy without configuration clashes.

Configuration (timeouts, logging, buffering, etc.) is supplied via commands at deploy time and only applies to the application being deployed.

It uses blocking commands, so when you deploy, the command will respond when the deployment is complete.

It has support for:

- Automatic TLS via Let's Encrypt
- Host-based routing
- Request and response buffering
- Maximum request and response sizes

And coming soon to Kamal:

- Pausing requests
- Maintenance mode
- Gradual rollouts

The proxy is distributed as a container via [Docker Hub](https://hub.docker.com/repository/docker/basecamp/kamal-proxy).

Kamal will ensure that a compatible version is in place before deploying.
