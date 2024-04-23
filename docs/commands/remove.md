---
title: Remove
---

# kamal remove

This will remove app, Traefik and accessory containers and log out of the docker registry.

It will prompt for confirmation unless you add the `-y` option.

Examples:

```bash
$ kamal registry login
  INFO [60171eef] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on localhost
  INFO [60171eef] Finished in 0.069 seconds with exit status 0 (successful).
  INFO [427368d0] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on server1
  INFO [4c4ab467] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on server3
  INFO [f985bed4] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on server2
  INFO [427368d0] Finished in 0.232 seconds with exit status 0 (successful).
  INFO [f985bed4] Finished in 0.234 seconds with exit status 0 (successful).
  INFO [4c4ab467] Finished in 0.245 seconds with exit status 0 (successful).
$ kamal registry logout
  INFO [72b94e74] Running docker logout registry:4443 on server2
  INFO [d096054d] Running docker logout registry:4443 on server1
  INFO [8488da90] Running docker logout registry:4443 on server3
  INFO [72b94e74] Finished in 0.142 seconds with exit status 0 (successful).
  INFO [8488da90] Finished in 0.179 seconds with exit status 0 (successful).
  INFO [d096054d] Finished in 0.183 seconds with exit status 0 (successful).
```
