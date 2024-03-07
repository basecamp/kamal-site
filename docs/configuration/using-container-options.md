---
title: Using container options
---

# Using container options

You can specialize the options used to start containers using the `options` definitions:

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
    options:
      cpus: 4
```

That'll start the job containers with `docker run ... --cpus 4 ...`.
