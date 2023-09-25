---
title: Using custom SSH connection management
---

# Using custom SSH connection management

Creating SSH connections concurrently can be an issue when deploying to many servers. By default Kamal will limit concurrent connection starts to 30 at a time.

It also sets a long idle timeout of 900 seconds on connections to prevent re-connection storms after a long idle period, like building an image or waiting for CI.

You can configure both of these settings:

```yaml
sshkit:
  max_concurrent_starts: 10
  pool_idle_timeout: 300
```
