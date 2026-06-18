---
# This file has been generated from the Kamal source, do not edit directly.
# Find the source of this file at lib/kamal/configuration/docs/output.yml in the Kamal repository.
title: Output
---

# Output

Configure where Kamal sends command output logs.

## [Output options](#output-options)

The options are specified under the output key in the configuration file.

```yaml
output:
```

## [OTel](#otel)

Ship deploy logs to an OpenTelemetry-compatible endpoint via OTLP HTTP.

Logs are sent as OTLP log records with resource attributes derived from
Kamal's deploy tags (service, version, performer, destination, etc.)

```yaml
  otel:
    endpoint: http://otel-gateway:4318
```

## [File](#file)

Write deploy logs to a file on the local machine.

One log file is created per deploy, named with the timestamp and command.

```yaml
  file:
    path: /var/log/kamal/
```
