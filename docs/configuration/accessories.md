---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/accessory.yml in the Kamal repository.
title: Accessories
---

# Accessories

Accessories can be booted on a single host, a list of hosts, or on specific roles.
The hosts do not need to be defined in the Kamal servers configuration.

Accessories are managed separately from the main service — they are not updated
when you deploy, and they do not have zero-downtime deployments.

Run `kamal accessory boot <accessory>` to boot an accessory.
See `kamal accessory --help` for more information.

## [Configuring accessories](#configuring-accessories)

First, define the accessory in the `accessories`:

```yaml
accessories:
  mysql:
```

## [Service name](#service-name)

This is used in the service label and defaults to `<service>-<accessory>`,
where `<service>` is the main service name from the root configuration:

```yaml
    service: mysql
```

## [Image](#image)

The Docker image to use.
Prefix it with its server when using root level registry different from Docker Hub.
Define registry directly or via anchors when it differs from root level registry.

```yaml
    image: mysql:8.0
```

## [Registry](#registry)

By default accessories use Docker Hub registry.
You can specify different registry per accessory with this option.
Don't prefix image with this registry server.
Use anchors if you need to set the same specific registry for several accessories.

```yml
registry:
  <<: *specific-registry
```

See [Docker Registry](../docker-registry) for more information:

```yaml
    registry:
      ...
```

## [Accessory hosts](#accessory-hosts)

Specify one of `host`, `hosts`, `role`, `roles`, `tag` or `tags`:

```yaml
    host: mysql-db1
    hosts:
      - mysql-db1
      - mysql-db2
    role: mysql
    roles:
      - mysql
    tag: writer
    tags:
      - writer
      - reader
```

## [Custom command](#custom-command)

You can set a custom command to run in the container if you do not want to use the default:

```yaml
    cmd: "bin/mysqld"
```

## [Port mappings](#port-mappings)

See [https://docs.docker.com/network/](https://docs.docker.com/network/), and
especially note the warning about the security implications of exposing ports publicly.

```yaml
    port: "127.0.0.1:3306:3306"
```

## [Labels](#labels)

```yaml
    labels:
      app: myapp
```

## [Options](#options)

These are passed to the Docker run command in the form `--<name> <value>`:

```yaml
    options:
      restart: always
      cpus: 2
```

## [Environment variables](#environment-variables)

See [Environment variables](../environment-variables) for more information:

```yaml
    env:
      ...
```

## [Copying files](#copying-files)

You can specify files to mount into the container.
The format is `local:remote`, where `local` is the path to the file on the local machine
and `remote` is the path to the file in the container.

They will be uploaded from the local repo to the host and then mounted.

ERB files will be evaluated before being copied.

```yaml
    files:
      - config/my.cnf.erb:/etc/mysql/my.cnf
      - config/myoptions.cnf:/etc/mysql/myoptions.cnf
```

## [Directories](#directories)

You can specify directories to mount into the container. They will be created on the host
before being mounted:

```yaml
    directories:
      - mysql-logs:/var/log/mysql
```

## [Volumes](#volumes)

Any other volumes to mount, in addition to the files and directories.
They are not created or copied before mounting:

```yaml
    volumes:
      - /path/to/mysql-logs:/var/log/mysql
```

## [Network](#network)

The network the accessory will be attached to.

Defaults to kamal:

```yaml
    network: custom
```

## [Proxy](#proxy)

You can run your accessory behind the Kamal proxy. See [Proxy](../proxy) for more information

```yaml
    proxy:
      ...
```
