---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/logging.yml in the Kamal repository.
title: Custom logging configuration
---

# Custom logging configuration

Set these to control the Docker logging driver and options.

## [Logging settings](#logging-settings)

These go under the logging key in the configuration file.

This can be specified at the root level or for a specific role.

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
