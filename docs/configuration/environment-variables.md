---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/env.yml in the Kamal repository.
title: Environment variables
---

# Environment variables

Environment variables can be set directly in the Kamal configuration or
read from `.kamal/secrets`.

## [Reading environment variables from the configuration](#reading-environment-variables-from-the-configuration)

Environment variables can be set directly in the configuration file.

These are passed to the `docker run` command when deploying.

```yaml
env:
  DATABASE_HOST: mysql-db1
  DATABASE_PORT: 3306
```

## [Secrets](#secrets)

Kamal uses dotenv to automatically load environment variables set in the `.kamal/secrets` file.

If you are using destinations, secrets will instead be read from `.kamal/secrets.<DESTINATION>` if
it exists.

Common secrets across all destinations can be set in `.kamal/secrets-common`.

This file can be used to set variables like `KAMAL_REGISTRY_PASSWORD` or database passwords.
You can use variable or command substitution in the secrets file.

```shell
KAMAL_REGISTRY_PASSWORD=$KAMAL_REGISTRY_PASSWORD
RAILS_MASTER_KEY=$(cat config/master.key)
```

You can also use [secret helpers](../../commands/secrets) for some common password managers.

```shell
SECRETS=$(kamal secrets fetch ...)

REGISTRY_PASSWORD=$(kamal secrets extract REGISTRY_PASSWORD $SECRETS)
DB_PASSWORD=$(kamal secrets extract DB_PASSWORD $SECRETS)
```

If you store secrets directly in `.kamal/secrets`, ensure that it is not checked into version control.

To pass the secrets, you should list them under the `secret` key. When you do this, the
other variables need to be moved under the `clear` key.

Unlike clear values, secrets are not passed directly to the container
but are stored in an env file on the host:

```yaml
env:
  clear:
    DB_USER: app
  secret:
    - DB_PASSWORD
```

## [Aliased secrets](#aliased-secrets)

You can also alias secrets to other secrets using a `:` separator.

This is useful when the ENV name is different from the secret name. For example, if you have two
places where you need to define the ENV variable `DB_PASSWORD`, but the value is different depending
on the context.

```shell
SECRETS=$(kamal secrets fetch ...)

MAIN_DB_PASSWORD=$(kamal secrets extract MAIN_DB_PASSWORD $SECRETS)
SECONDARY_DB_PASSWORD=$(kamal secrets extract SECONDARY_DB_PASSWORD $SECRETS)
```

```yaml
env:
  secret:
    - DB_PASSWORD:MAIN_DB_PASSWORD
  tags:
    secondary_db:
      secret:
        - DB_PASSWORD:SECONDARY_DB_PASSWORD
accessories:
  main_db_accessory:
    env:
      secret:
        - DB_PASSWORD:MAIN_DB_PASSWORD
  secondary_db_accessory:
    env:
      secret:
        - DB_PASSWORD:SECONDARY_DB_PASSWORD
```

## [Tags](#tags)

Tags are used to add extra env variables to specific hosts.
See [Servers](../servers) for how to tag hosts.

Tags are only allowed in the top-level env configuration (i.e., not under a role-specific env).

The env variables can be specified with secret and clear values as explained above.

```yaml
env:
  tags:
    <tag1>:
      MYSQL_USER: monitoring
    <tag2>:
      clear:
        MYSQL_USER: readonly
      secret:
        - MYSQL_PASSWORD
```

## [Example configuration](#example-configuration)

```yaml
env:
  clear:
    MYSQL_USER: app
  secret:
    - MYSQL_PASSWORD
  tags:
    monitoring:
      MYSQL_USER: monitoring
    replica:
      clear:
        MYSQL_USER: readonly
      secret:
        - READONLY_PASSWORD
```
