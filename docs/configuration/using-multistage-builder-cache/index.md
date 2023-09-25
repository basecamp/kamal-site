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

# Using Registry cache with additinonal cache-to options
builder:
  cache:
    type: registry
    options: mode=max,image-manifest=true,oci-mediatypes=true
```

For further insights into build cache optimization, check out documentation on Docker's official website: https://docs.docker.com/build/cache/.
