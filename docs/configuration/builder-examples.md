---
title: Builder examples
---

# Builder examples

## [Using remote builder for native multi-arch](#using-remote-builder-for-native-multi-arch)

If you're developing on ARM64 (like Apple Silicon), but you want to deploy on AMD64 (x86 64-bit), you can use multi-architecture images. By default, Kamal will setup a local buildx configuration that does this through QEMU emulation. But this can be quite slow, especially on the first build.

If you want to speed up this process by using a remote AMD64 host to natively build the AMD64 part of the image, while natively building the ARM64 part locally, you can do so using builder options:

```yaml
builder:
  local:
    arch: arm64
    host: unix:///Users/<%= `whoami`.strip %>/.docker/run/docker.sock
  remote:
    arch: amd64
    host: ssh://root@192.168.0.1
```

**Note:** You must have Docker running on the remote host being used as a builder. This instance should only be shared for builds using the same registry and credentials.

## [Using remote builder for single-arch](#using-remote-builder-for-single-arch)

If you're developing on ARM64 (like Apple Silicon), want to deploy on AMD64 (x86 64-bit), but don't need to run the image locally (or on other ARM64 hosts), you can configure a remote builder that just targets AMD64. This is a bit faster than building with multi-arch, as there's nothing to build locally.

```yaml
builder:
  remote:
    arch: amd64
    host: ssh://root@192.168.0.1
```

## [Using local builder for single-arch](#using-local-builder-for-single-arch)

If you're developing on multiple architectures, always deploy on a specific architecture(e.g. AMD64), and want to build locally, you can configure a remote builder without a host. Kamal will build the image using a local buildx instance.

```yaml
builder:
  remote:
    arch: amd64
```

## [Using native builder when multi-arch isn't needed](#using-native-builder-when-multi-arch-isnt-needed)

If you're developing on the same architecture as the one you're deploying on, you can speed up the build by forgoing both multi-arch and remote building:

```yaml
builder:
  multiarch: false
```

This is also a good option if you're running Kamal from a CI server that shares architecture with the deployment servers.

## [Using a different Dockerfile or context when building](#using-a-different-dockerfile-or-context-when-building)

If you need to pass a different Dockerfile or context to the build command (e.g. if you're using a monorepo or you have different Dockerfiles), you can do so in the builder options:

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

Docker multistage build cache can singlehandedly speed up your builds by a lot. Currently Kamal only supports using the GHA cache or the Registry cache:

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

### [GHA cache configuration](#gha-cache-configuration)

To make it work on the GitHub action workflow you need to setup the buildx and expose [authentication configuration for the cache](https://docs.docker.com/build/cache/backends/gha/#authentication).

Example setup (in .github/workflows/sample-ci.yml):

```yaml
- name: Set up Docker Buildx for cache
  uses: docker/setup-buildx-action@v3

- name: Expose GitHub Runtime for cache
  uses: crazy-max/ghaction-github-runtime@v3
```

When setup correctly you should see the cache entry/entries on the GHA workflow actions cache section.

For further insights into build cache optimization, check out documentation on Docker's official website: https://docs.docker.com/build/cache/.

## [Using build secrets for new images](#using-build-secrets-for-new-images)

Some images need a secret passed in during build time, like a GITHUB_TOKEN, to give access to private gem repositories. This can be done by having the secret in ENV, then referencing it in the builder configuration:

```yaml
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

```
ARG RUBY_VERSION
FROM ruby:$RUBY_VERSION-slim as base
```
