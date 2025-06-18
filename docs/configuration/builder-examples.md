---
title: Builder examples
---

# Builder examples

## [Using remote builder for single-arch](#using-remote-builder-for-single-arch)

If you're developing on ARM64 (like Apple Silicon), but you want to deploy on AMD64 (x86 64-bit), by default, Kamal will set up a local buildx configuration that does this through QEMU emulation. However, this can be quite slow, especially on the first build.

If you want to speed up this process by using a remote AMD64 host to natively build the AMD64 part of the image, you can set a remote builder:

```yaml
builder:
  arch: amd64
  remote: ssh://root@192.168.0.1
```

Kamal will use the remote to build when deploying from an ARM64 machine, or build locally when deploying from an AMD64 machine.

**Note:** You must have Docker running on the remote host being used as a builder. This instance should only be shared for builds using the same registry and credentials.

## [Using remote builder for multi-arch](#using-remote-builder-for-native-multi-arch)

You can also build a multi-arch image. If a remote is set, Kamal will build the architecture matching your deployment server locally and the other architecture remotely.

So if you're developing on ARM64 (like Apple Silicon), it will build the ARM64 architecture locally and the AMD64 architecture remotely.

```yaml
builder:
  arch:
    - amd64
    - arm64
  remote: ssh://root@192.168.0.1
```

## [Using local builder for single-arch](#using-local-builder-for-single-arch)

If you always want to build locally for a single architecture, Kamal will build the image using a local buildx instance.

```yaml
builder:
  arch: amd64
```

## [Using a different Dockerfile or context when building](#using-a-different-dockerfile-or-context-when-building)

If you need to pass a different Dockerfile or context to the build command (e.g., if you're using a monorepo or you have different Dockerfiles), you can do so in the builder options:

```yaml
# Use a different Dockerfile
builder:
  dockerfile: Dockerfile.xyz

# Set context
builder:
  context: ".."

# Set Dockerfile and context
builder:
  dockerfile: "../Dockerfile.xyz"
  context: ".."
```

## [Using multistage builder cache](#using-multistage-builder-cache)

Docker multistage build cache can speed up your builds. Currently, Kamal only supports using the GHA cache or the Registry cache:

```yaml
# Using GHA cache
builder:
  cache:
    type: gha

# Using Registry cache
builder:
  cache:
    type: registry

# Using Registry cache with different cache image
builder:
  cache:
    type: registry
    # default image name is <image>-build-cache
    image: application-cache-image

# Using Registry cache with additional cache-to options
builder:
  cache:
    type: registry
    options: mode=max,image-manifest=true,oci-mediatypes=true
```

## [Building without a Dockerfile locally](#building-without-a-dockerfile-locally)

Your application image can also be built using [cloud native buildpacks](https://buildpacks.io/) instead of using a `Dockerfile` and the default `docker build` process. This example uses Heroku's [ruby](https://github.com/heroku/heroku-buildpack-ruby) and [Procfile](https://github.com/heroku/buildpacks-procfile) buildpacks to build your final image. 

``` yaml
  pack:
    builder: heroku/builder:24
    buildpacks:
      - heroku/ruby
      - heroku/procfile
```

To provide any additional customizations you can add a [project descriptor file](https://buildpacks.io/docs/for-app-developers/how-to/build-inputs/use-project-toml/) (`project.toml`) in the root of your application.

### [GHA cache configuration](#gha-cache-configuration)

To make it work on the GitHub action workflow, you need to set up the buildx and expose [authentication configuration for the cache](https://docs.docker.com/build/cache/backends/gha/#authentication).

Example setup (in .github/workflows/sample-ci.yml):

```yaml
- name: Set up Docker Buildx for cache
  uses: docker/setup-buildx-action@v3

- name: Expose GitHub Runtime for cache
  uses: crazy-max/ghaction-github-runtime@v3
```

When set up correctly, you should see the cache entry/entries on the GHA workflow actions cache section.

For further insights into build cache optimization, check out the documentation on Docker's official website: https://docs.docker.com/build/cache/.

## [Using build secrets for new images](#using-build-secrets-for-new-images)

Some images need a secret passed in during build time, like a GITHUB_TOKEN, to give access to private gem repositories. This can be done by setting the secret in `.kamal/secrets`, then referencing it in the builder configuration:

```bash
# .kamal/secrets

GITHUB_TOKEN=$(gh config get -h github.com oauth_token)
```

```yaml
# config/deploy.yml

builder:
  secrets:
    - GITHUB_TOKEN
```

This build secret can then be referenced in the Dockerfile:

```dockerfile
# Copy Gemfiles
COPY Gemfile Gemfile.lock ./

# Install dependencies, including private repositories via access token (then remove bundle cache with exposed GITHUB_TOKEN)
RUN --mount=type=secret,id=GITHUB_TOKEN \
  BUNDLE_GITHUB__COM=x-access-token:$(cat /run/secrets/GITHUB_TOKEN) \
  bundle install && \
  rm -rf /usr/local/bundle/cache
```

## [Configuring build args for new images](#configuring-build-args-for-new-images)

Build arguments that aren't secret can also be configured:

```yaml
builder:
  args:
    RUBY_VERSION: 3.2.0
```

This build argument can then be used in the Dockerfile:

```dockerfile
ARG RUBY_VERSION
FROM ruby:$RUBY_VERSION-slim as base
```
