---
title: Using secret env variables
---

# Using secret env variables

If you have env variables that are secret, you can divide the `env` block into `clear` and `secret`:

```yaml
env:
  clear:
    DATABASE_URL: mysql2://db1/hey_production/
    REDIS_URL: redis://redis1:6379/1
  secret:
    - DATABASE_PASSWORD
    - REDIS_PASSWORD
```

The list of secret env variables will be expanded at run time from your local machine. So a reference to a secret `DATABASE_PASSWORD` will look for `ENV["DATABASE_PASSWORD"]` on the machine running Kamal. Just like with build secrets.

If the referenced secret ENVs are missing, the configuration will be halted with a `KeyError` exception.

**Note:** Marking an ENV as secret currently only redacts its value in the output for Kamal. The ENV is still injected in the clear into the container at runtime.
