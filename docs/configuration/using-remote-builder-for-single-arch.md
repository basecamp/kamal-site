---
title: Using remote builder for single-arch
---

# Using remote builder for single-arch

If you're developing on ARM64 (like Apple Silicon), want to deploy on AMD64 (x86 64-bit), but don't need to run the image locally (or on other ARM64 hosts), you can configure a remote builder that just targets AMD64. This is a bit faster than building with multi-arch, as there's nothing to build locally.

```yaml
builder:
  remote:
    arch: amd64
    host: ssh://root@192.168.0.1
```
