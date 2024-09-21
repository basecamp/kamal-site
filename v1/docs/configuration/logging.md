---
title: Custom logging configuration
---

# Custom logging configuration

Set these to control the Docker logging driver and options.

## [Logging settings](#logging-settings)

These go under the logging key in the configuration file.

This can be specified in the root level or for a specific role.

```yaml
logging:
```

## [Driver](#driver)

The logging driver to use, passed to Docker via `--log-driver`:

```yaml
  driver: json-file
```

## [Options](#options)

Any logging options to pass to the driver, passed to Docker via `--log-opt`:

```yaml
  options:
    max-size: 100m
```
