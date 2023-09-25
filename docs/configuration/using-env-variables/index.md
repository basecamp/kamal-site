---
title: Using env variables
---

# Using env variables

You can inject env variables into the app containers using `env`:

```yaml
env:
  DATABASE_URL: mysql2://db1/hey_production/
  REDIS_URL: redis://redis1:6379/1
```

**Note:** Before you can start the containers you need to push the env variables up to the servers.
