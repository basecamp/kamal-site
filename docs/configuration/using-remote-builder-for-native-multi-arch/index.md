---
title: Using remote builder for native multi-arch
---

# Using remote builder for native multi-arch

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
