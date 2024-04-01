---
title: Stop wait time
---

# Stop wait time

On a new deploy, each old running container is gracefully shut down with a `SIGTERM`, and after a grace period of `10` seconds a `SIGKILL` is sent. You can configure this value via the `stop_wait_time` option:

```yaml
stop_wait_time: 30
```
