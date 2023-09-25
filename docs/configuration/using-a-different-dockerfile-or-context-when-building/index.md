---
title: Using a different Dockerfile or context when building
---

# Using a different Dockerfile or context when building

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
