---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/builder.yml in the Kamal repository.
title: Builder
---

# Builder

The builder configuration controls how the application is built with `docker build`.

See [Builder examples](/docs/configuration/builder-examples/) for more information.

## [Builder options](#builder-options)

Options go under the builder key in the root configuration.

```yaml
builder:
```

## [Arch](#arch)

The architectures to build for — you can set an array or just a single value.

Allowed values are `amd64` and `arm64`:

```yaml
  arch:
    - amd64
```

## [Remote](#remote)

The connection string for a remote builder. If supplied, Kamal will use this
for builds that do not match the local architecture of the deployment host.

```yaml
  remote: ssh://docker@docker-builder
```

## [Local](#local)

If set to false, Kamal will always use the remote builder even when building
the local architecture.

Defaults to true:

```yaml
  local: true
```

## [Builder cache](#builder-cache)

The type must be either 'gha' or 'registry'.

The image is only used for registry cache and is not compatible with the Docker driver:

```yaml
  cache:
    type: registry
    options: mode=max
    image: kamal-app-build-cache
```

## [Build context](#build-context)

If this is not set, then a local Git clone of the repo is used.
This ensures a clean build with no uncommitted changes.

To use the local checkout instead, you can set the context to `.`, or a path to another directory.

```yaml
  context: .
```

## [Dockerfile](#dockerfile)

The Dockerfile to use for building, defaults to `Dockerfile`:

```yaml
  dockerfile: Dockerfile.production
```

## [Build target](#build-target)

If not set, then the default target is used:

```yaml
  target: production
```

## [Build arguments](#build-arguments)

Any additional build arguments, passed to `docker build` with `--build-arg <key>=<value>`:

```yaml
  args:
    ENVIRONMENT: production
```

## [Referencing build arguments](#referencing-build-arguments)

```shell
ARG RUBY_VERSION
FROM ruby:$RUBY_VERSION-slim as base
```

## [Build secrets](#build-secrets)

Values are read from `.kamal/secrets`:

```yaml
  secrets:
    - SECRET1
    - SECRET2
```

## [Referencing build secrets](#referencing-build-secrets)

```shell
# Copy Gemfiles
COPY Gemfile Gemfile.lock ./

# Install dependencies, including private repositories via access token
# Then remove bundle cache with exposed GITHUB_TOKEN
RUN --mount=type=secret,id=GITHUB_TOKEN \
  BUNDLE_GITHUB__COM=x-access-token:$(cat /run/secrets/GITHUB_TOKEN) \
  bundle install && \
  rm -rf /usr/local/bundle/cache
```

## [SSH](#ssh)

SSH agent socket or keys to expose to the build:

```yaml
  ssh: default=$SSH_AUTH_SOCK
```

## [Driver](#driver)

The build driver to use, defaults to `docker-container`:

```yaml
  driver: docker
```
