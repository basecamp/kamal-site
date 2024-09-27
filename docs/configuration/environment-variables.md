---
title: Environment variables
---

# Environment variables

Environment variables can be set directly in the Kamal configuration or read from .kamal/secrets.

## [Reading environment variables from the configuration](#reading-environment-variables-from-the-configuration)

Environment variables can be set directly in the configuration file.

These are passed to the docker run command when deploying.

```yaml
env:
  DATABASE_HOST: mysql-db1
  DATABASE_PORT: 3306
```

## [Secrets](#secrets)

Kamal uses dotenv to automatically load environment variables set in the `.kamal/secrets` file.

If you are using destinations, secrets will instead be read from `.kamal/secrets.<DESTINATION>` if it exists.

Common secrets across all destinations can be set in `.kamal/secrets-common`.

This file can be used to set variables like `KAMAL_REGISTRY_PASSWORD` or database passwords. You can use variable or command substitution in the secrets file.

```
KAMAL_REGISTRY_PASSWORD=$KAMAL_REGISTRY_PASSWORD
RAILS_MASTER_KEY=$(cat config/master.key)
```

You can also use [secret helpers](../commands/secrets) for some common password managers.

```
SECRETS=$(kamal secrets fetch ...)

REGISTRY_PASSWORD=$(kamal secrets extract REGISTRY_PASSWORD $SECRETS)
DB_PASSWORD=$(kamal secrets extract DB_PASSWORD $SECRETS)
```

If you store secrets directly in .kamal/secrets, ensure that it is not checked into version control.

To pass the secrets you should list them under the `secret` key. When you do this the other variables need to be moved under the `clear` key.

Unlike clear values, secrets are not passed directly to the container, but are stored in an env file on the host:

```yaml
env:
  clear:
    DB_USER: app
  secret:
    - DB_PASSWORD
```

## [Tags](#tags)

Tags are used to add extra env variables to specific hosts. See [Servers](../servers) for how to tag hosts.

Tags are only allowed in the top level env configuration (i.e not under a role specific env).

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
