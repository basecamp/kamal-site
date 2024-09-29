---
title: Kamal Configuration
---

# Kamal Configuration

Configuration is read from the `config/deploy.yml`.

## [Destinations](#destinations)

When running commands, you can specify a destination with the `-d` flag, e.g., `kamal deploy -d staging`.

In this case, the configuration will also be read from `config/deploy.staging.yml` and merged with the base configuration.

## [Extensions](#extensions)

Kamal will not accept unrecognized keys in the configuration file.

However, you might want to declare a configuration block using YAML anchors and aliases to avoid repetition.

You can prefix a configuration section with `x-` to indicate that it is an extension. Kamal will ignore the extension and not raise an error.

## [The service name](#the-service-name)

This is a required value. It is used as the container name prefix.

```yaml
service: myapp
```

## [The Docker image name](#the-docker-image-name)

The image will be pushed to the configured registry.

```yaml
image: my-image
```

## [Labels](#labels)

Additional labels to add to the container:

```yaml
labels:
  my-label: my-value
```

## [Volumes](#volumes)

Additional volumes to mount into the container:

```yaml
volumes:
  - /path/on/host:/path/in/container:ro
```

## [Registry](#registry)

The Docker registry configuration, see [Docker Registry](../docker-registry):

```yaml
registry:
  ...
```

## [Servers](#servers)

The servers to deploy to, optionally with custom roles, see [Servers](../servers):

```yaml
servers:
  ...
```

## [Environment variables](#environment-variables)

See [Environment variables](../environment-variables):

```yaml
env:
  ...
```

## [Asset path](#asset-path)

Used for asset bridging across deployments, default to `nil`.

If there are changes to CSS or JS files, we may get requests for the old versions on the new container, and vice versa.

To avoid 404s, we can specify an asset path. Kamal will replace that path in the container with a mapped volume containing both sets of files. This requires that file names change when the contents change (e.g., by including a hash of the contents in the name).

To configure this, set the path to the assets:

```yaml
asset_path: /path/to/assets
```

## [Hooks path](#hooks-path)

Path to hooks, defaults to `.kamal/hooks`. See [Hooks](/docs/hooks) for more information:

```yaml
hooks_path: /user_home/kamal/hooks
```

## [Require destinations](#require-destinations)

Whether deployments require a destination to be specified, defaults to `false`:

```yaml
require_destination: true
```

## [Primary role](#primary-role)

This defaults to `web`, but if you have no web role, you can change this:

```yaml
primary_role: workers
```

## [Allowing empty roles](#allowing-empty-roles)

Whether roles with no servers are allowed. Defaults to `false`:

```yaml
allow_empty_roles: false
```

## [Retain containers](#retain-containers)

How many old containers and images we retain, defaults to 5:

```yaml
retain_containers: 3
```

## [Minimum version](#minimum-version)

The minimum version of Kamal required to deploy this configuration, defaults to `nil`:

```yaml
minimum_version: 1.3.0
```

## [Readiness delay](#readiness-delay)

Seconds to wait for a container to boot after it is running, default 7.

This only applies to containers that do not run a proxy or specify a healthcheck:

```yaml
readiness_delay: 4
```

## [Deploy timeout](#deploy-timeout)

How long to wait for a container to become ready, default 30:

```yaml
deploy_timeout: 10
```

## [Drain timeout](#drain-timeout)

How long to wait for a container to drain, default 30:

```yaml
drain_timeout: 10
```

## [SSH options](#ssh-options)

See [SSH](../ssh):

```yaml
ssh:
  ...
```

## [Builder options](#builder-options)

See [Builders](../builders):

```yaml
builder:
  ...
```

## [Accessories](#accessories)

Additional services to run in Docker, see [Accessories](../accessories):

```yaml
accessories:
  ...
```

## [Proxy](#proxy)

Configuration for kamal-proxy, see [Proxy](../proxy):

```yaml
proxy:
  ...
```

## [SSHKit](#sshkit)

See [SSHKit](../sshkit):

```yaml
sshkit:
  ...
```

## [Boot options](#boot-options)

See [Booting](../booting):

```yaml
boot:
  ...
```

## [Logging](#logging)

Docker logging configuration, see [Logging](../logging):

```yaml
logging:
  ...
```

## [Aliases](#aliases)

Alias configuration, see [Aliases](../aliases):

```yaml
aliases:
  ...
```
