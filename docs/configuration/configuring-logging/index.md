---
title: Configuring logging
---

# Configuring logging

You can configure the logging driver and options passed to Docker using `logging`:

```yaml
logging:
  driver: awslogs
  options:
    awslogs-region: "eu-central-2"
    awslogs-group: "my-app"
```

If nothing is configured, the default option `max-size=10m` is used for all containers. The default logging driver of Docker is `json-file`.
