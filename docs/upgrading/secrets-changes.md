---
title: Secrets
---

# Secrets Changes

You should move your secrets from `.env`/`.env.rb` to `.kamal/secrets.`

If you are using destinations, secrets will be read from `.kamal/secrets-<DESTINATION>`.

## Interpolating secrets

The `kamal envify` and `kamal env` commands have been removed - secrets will be loaded on demand for
each command that needs them.

If you were generating secrets with `kamal envify` you can instead use dotenv's command and variable
interpolation.

```
# .kamal/secrets

SECRET_FROM_ENV=$SECRET_FROM_ENV
SECRET_FROM_COMMAND=$(op read ...)
```

See [here](../configuration/environment-variables#using-kamal-secrets) for more details


## Referring to environment variables in deploy.yml

In Kamal 1, `.env` was loaded into the environment, so you could refer to
values from it via ERB in `deploy.yml`. This is no longer the case in Kamal 2.
Values from `.kamal/secrets` are not loaded either

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
