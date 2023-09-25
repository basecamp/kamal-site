---
title: Traefik version, upgrades, and custom images
---

# Traefik version, upgrades, and custom images

Kamal runs the traefik:v2.9 image to track Traefik 2.9.x releases.

To pin Traefik to a specific version or an image published to your registry, specify `image`:

```yaml
traefik:
  image: traefik:v2.10.0-rc1
```

This is useful for downgrading Traefik if there's an unexpected breaking change in a minor version release, upgrading Traefik to test forthcoming releases, or running your own Traefik-derived image.

Kamal has not been tested for compatibility with Traefik 3 betas. Please do!
