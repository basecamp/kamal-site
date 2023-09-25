---
title: Using different roles for servers
---

# Using different roles for servers

If your application uses separate hosts for running jobs or other roles beyond the default web running, you can specify these hosts in a dedicated role with a new entrypoint command like so:

```yaml
servers:
  web:
    - 192.168.0.1
    - 192.168.0.2
  job:
    hosts:
      - 192.168.0.3
      - 192.168.0.4
    cmd: bin/jobs
```

**Note:** Traefik will only by default be installed and run on the servers in the `web` role (and on all servers if no roles are defined). If you need Traefik on hosts in other roles than `web`, add `traefik: true`:

```yaml
servers:
  web:
    - 192.168.0.1
    - 192.168.0.2
  web2:
    traefik: true
    hosts:
      - 192.168.0.3
      - 192.168.0.4
```
