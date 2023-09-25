---
title: Using Cron
---

# Using Cron

You can use a specific container to run your Cron jobs:

```yaml
servers:
  cron:
    hosts:
      - 192.168.0.1
    cmd:
      bash -c "cat config/crontab | crontab - && cron -f"
```

This assumes the Cron settings are stored in `config/crontab`.
