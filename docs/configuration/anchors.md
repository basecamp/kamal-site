---
title: Anchors
---

# Anchors

You can re-use parts of your Kamal configuration by defining them as anchors and referencing them with aliases.

For example, you might need to define a shared healthcheck for multiple worker roles. Anchors
begin with `x-` and are defined at the root level of your deploy.yml file.

```yaml
x-worker-healthcheck: &worker-healthcheck
  health-cmd: bin/worker-healthcheck
  health-start-period: 5s
  health-retries: 5
  health-interval: 5s
```

To use this anchor in your deploy configuration, reference it via the alias.

```yaml
servers:
  worker:
    hosts:
      - 867.53.0.9
    cmd: bin/jobs
    options:
      <<: *worker-healthcheck
```
