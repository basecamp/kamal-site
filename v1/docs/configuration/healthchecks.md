---
title: Healthcheck configuration
---

# Healthcheck configuration


On roles that are running Traefik, Kamal will supply a default healthcheck to `docker run`.
For other roles, by default no healthcheck is supplied.

If no healthcheck is supplied and the image does not define one, they we wait for the container
to reach a running state and then pause for the readiness delay.

The default healthcheck is `curl -f http://localhost:<port>/<path>`, so it assumes that `curl`
is available within the container.

## [Healthcheck options](#healthcheck-options)

These go under the `healthcheck` key in the root or role configuration.
```yaml
healthcheck:
```
## [Command](#command)

The command to run, defaults to `curl -f http://localhost:<port>/<path>` on roles running Traefik
```yaml
  cmd: "curl -f http://localhost"
```
## [Interval](#interval)

The Docker healthcheck interval, defaults to `1s`
```yaml
  interval: 10s
```
## [Max attempts](#max-attempts)

The maximum number of times we poll the container to see if it is healthy, defaults to `7`
Each check is separated by an increasing interval starting with 1 second.
```yaml
  max_attempts: 3
```
## [Port](#port)

The port to use in the healthcheck, defaults to `3000`
```yaml
  port: "80"
```
## [Path](#path)

The path to use in the healthcheck, defaults to `/up`
```yaml
  path: /health
```
## [Cords for zero-downtime deployments](#cords-for-zero-downtime-deployments)

The cord file is used for zero-downtime deployments. The healthcheck is augmented with a check
for the existance of the file. This allows us to delete the file and force the container to
become unhealthy, causing Traefik to stop routing traffic to it.

Kamal mounts a volume at this location and creates the file before starting the container.
You can set the value to `false` to disable the cord file, but this loses the zero-downtime
guarantee.

The default value is `/tmp/kamal-cord`
```yaml
  cord: /cord
```
## [Log lines](#log-lines)

Number of lines to log from the container when the healthcheck fails, defaults to `50`
```yaml
  log_lines: 100
```
