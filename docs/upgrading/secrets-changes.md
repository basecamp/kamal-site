---
title: Secrets changes
---

# Kamal 2: Secrets changes

Secrets have moved from `.env`/`.env.rb` to `.kamal/secrets`.

If you are using destinations, secrets will be read from `.kamal/secrets.<DESTINATION>` first or `.kamal/secrets` if it is not found.

## [Interpolating secrets](#interpolating-secrets)

The `kamal envify` and `kamal env` commands have been removed, and secrets no longer have a separate lifecycle.

If you were generating secrets with `kamal envify`, you can instead use dotenv's [command](https://github.com/bkeepers/dotenv?tab=readme-ov-file#command-substitution) and [variable](https://github.com/bkeepers/dotenv?tab=readme-ov-file#variable-substitution) substitution.

To load the secrets from `.env`/`.env.rb`, now you must prefix every Kamal command with `dotenv`, ex: `dotenv kamal deploy`.

The substitution will be performed on demand when running Kamal commands that need them.

```
# .kamal/secrets

SECRET_FROM_ENV=$SECRET_FROM_ENV
SECRET_FROM_COMMAND=$(op read ...)
```

See [here](../../configuration/environment-variables#using-kamal-secrets) for more details.

## [Environment variables in deploy.yml](#environment-variables-in-deployyml)

In Kamal 1, `.env` was loaded into the environment, so you could refer to values from it via ERB in `deploy.yml`. This is no longer the case in Kamal 2. Values from `.kamal/secrets` are not loaded either.

Kamal 1:

```
# .env
SERVER_IP=127.0.0.1

# config/deploy.yml
servers
  - <%= ENV["SERVER_IP"] %>
```

To make this work in Kamal 2, you can manually load `.env`.

Kamal 2:

```
# .env
SERVER_IP=127.0.0.1

# config/deploy.yml

<% require "dotenv"; Dotenv.load(".env") %>

servers
  - <%= ENV["SERVER_IP"] %>
```
