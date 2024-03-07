---
title: Using multistage builder cache
---

# Using multistage builder cache

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

## [GHA cache configuration](#gha-cache-configuration)

To make it work on the Github action workflow you need to setup the buildx and expose [authentication configuration for the cache](https://docs.docker.com/build/cache/backends/gha/#authentication).

Example setup (in .github/workflows/sample-ci.yml):

```yaml
- name: Set up Docker Buildx for cache
  uses: docker/setup-buildx-action@v3

- name: Expose GitHub Runtime for cache
  uses: crazy-max/ghaction-github-runtime@v3
```

When setup correctly you should see the cache entry/entries on the GHA workflow actions cache section.

For further insights into build cache optimization, check out documentation on Docker's official website: https://docs.docker.com/build/cache/.
