---
title: Environment variables
---

# Environment variables


Environment variables can be set directory in the Kamal configuration or
for loaded from a .env file, for secrets that should not be checked into Git.

## [Reading environment variables from the configuration](#reading-environment-variables-from-the-configuration)

Environment variables can be set directly in the configuration file.

These are passed to the docker run command when deploying.
```yaml
env:
  DATABASE_HOST: mysql-db1
  DATABASE_PORT: 3306
```
## [Using .env file to load required environment variables](#using-.env-file-to-load-required-environment-variables)

Kamal uses dotenv to automatically load environment variables set in the .env file present
in the application root.

This file can be used to set variables like KAMAL_REGISTRY_PASSWORD or database passwords.
But for this reason you must ensure that .env files are not checked into Git or included
in your Dockerfile! The format is just key-value like:
```
KAMAL_REGISTRY_PASSWORD=pw
DB_PASSWORD=secret123
```
See [Envify](/docs/commands/envify/) for how to use generated .env files.

To pass the secrets you should list them under the `secret` key. When you do this the
other variables need to be moved under the `clear` key.

Unlike clear valies, secrets are not passed directly to the container,
 but are stored in an env file on the host
The file is not updated when deploying, only when running `kamal envify` or `kamal env push`.
```yaml
env:
  clear:
    DB_USER: app
  secret:
    - DB_PASSWORD
```
## [Tags](#tags)

Tags are used to add extra env variables to specific hosts.
See [Servers](../servers) for how to tag hosts.

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
