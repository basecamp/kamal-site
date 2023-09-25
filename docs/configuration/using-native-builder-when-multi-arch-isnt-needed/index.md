---
title: Using native builder when multi-arch isn't needed
---

# Using native builder when multi-arch isn't needed

If you're developing on the same architecture as the one you're deploying on, you can speed up the build by forgoing both multi-arch and remote building:

```yaml
builder:
  multiarch: false
```

This is also a good option if you're running Kamal from a CI server that shares architecture with the deployment servers.
