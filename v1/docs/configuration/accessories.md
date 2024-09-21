---
title: Accessories
---

# Accessories

Accessories can be booted on a single host, a list of hosts, or on specific roles. The hosts do not need to be defined in the Kamal servers configuration.

Accessories are managed separately from the main service — they are not updated when you deploy and they do not have zero-downtime deployments.

Run `kamal accessory boot <accessory>` to boot an accessory.
See `kamal accessory --help` for more information.

## [Configuring accessories](#configuring-accessories)

First define the accessory in the `accessories`:

```yaml
accessories:
  mysql:
```

## [Service name](#service-name)

This is used in the service label and defaults to `<service>-<accessory>` where `<service>` is the main service name from the root configuration:

```yaml
    service: mysql
```

## [Image](#image)

The Docker image to use, prefix with a registry if not using Docker hub:

```yaml
    image: mysql:8.0
```

## [Accessory hosts](#accessory-hosts)

Specify one  of `host`, `hosts` or `roles`:

```yaml
    host: mysql-db1
    hosts:
      - mysql-db1
      - mysql-db2
    roles:
      - mysql
```

## [Custom command](#custom-command)

You can set a custom command to run in the container, if you do not want to use the default:

```yaml
    cmd: "bin/mysqld"
```

## [Port mappings](#port-mappings)

See https://docs.docker.com/network/, especially note the warning about the security implications of exposing ports publicly.

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

You can specify files to mount into the container. The format is `local:remote` where `local` is the path to the file on the local machine and `remote` is the path to the file in the container.

They will be uploaded from the local repo to the host and then mounted.

ERB files will be evaluated before being copied.

```yaml
    files:
      - config/my.cnf.erb:/etc/mysql/my.cnf
      - config/myoptions.cnf:/etc/mysql/myoptions.cnf
```

## [Directories](#directories)

You can specify directories to mount into the container. They will be created on the host before being mounted:

```yaml
    directories:
      - mysql-logs:/var/log/mysql
```

## [Volumes](#volumes)

Any other volumes to mount, in addition to the files and directories. They are not created or copied before mounting:

```yaml
    volumes:
      - /path/to/mysql-logs:/var/log/mysql
```
