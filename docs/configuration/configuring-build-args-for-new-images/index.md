---
title: Configuring build args for new images
---

# Configuring build args for new images

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
