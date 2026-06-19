---
title: Cron
---

# Cron

You can use a specific container to run your Cron jobs:

```yaml
servers:
  cron:
    hosts:
      - 192.168.0.1
    cmd:
      bash -c "(env | grep -v -E '=\s*$' && cat config/crontab) | crontab - && cron -f"
```

This assumes that the Cron settings are stored in `config/crontab`. Cron does not automatically propagate environment variables, the example above copies them into the crontab. It will also filter out empty env vars because `crontab` can fail if they are present.
