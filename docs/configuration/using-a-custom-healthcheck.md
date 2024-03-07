---
title: Using a custom healthcheck
---

# Using a custom healthcheck

Kamal uses Docker healthchecks to check the health of your application during deployment. Traefik uses this same healthcheck status to determine when a container is ready to receive traffic.

The healthcheck defaults to testing the HTTP response to the path `/up` on port 3000, up to 7 times. You can tailor this behaviour with the `healthcheck` setting:

```yaml
healthcheck:
  path: /healthz
  port: 4000
  max_attempts: 7
  interval: 20s
```

This will ensure your application is configured with a traefik label for the healthcheck against `/healthz` and that the pre-deploy healthcheck that Kamal performs is done against the same path on port 4000.

You can also specify a custom healthcheck command, which is useful for non-HTTP services:

```yaml
healthcheck:
  cmd: /bin/check_health
```

The top-level healthcheck configuration applies to all services that use Traefik, by default. You can also specialize the configuration at the role level:

```yaml
servers:
  job:
    hosts: ...
    cmd: bin/jobs
    healthcheck:
      cmd: bin/check
```

The healthcheck allows for an optional `max_attempts` setting, which will attempt the healthcheck up to the specified number of times before failing the deploy. This is useful for applications that take a while to start up. The default is 7.

The HTTP health checks assume that the `curl` command is available inside the container. If that's not the case, use the healthcheck's `cmd` option to specify an alternative check that the container supports.

When starting container healthcheck by default will only show last 50 lines. That might be not enough when something goes wrong - so you can add `log_lines` params and specify larger number if required.

## [Zero-downtime deploy with cord files](#zero-downtime-deploy-with-cord-files)

We need to stop Traefik from sending requests to old containers before stopping them, otherwise we could get errors. We do this with a cord file.

The file is created in a directory on the host and the directory is mounted into the container. The healthcheck is modified to check for the file.

When we want to shut down the container we first delete the cord file, then wait for container to become unhealthy.

By default the directory is mounted to `/tmp/kamal-cord`. You can change the location with

```
healthcheck:
  cord: /var/run/kamal-cord
```

Or disable the cord (and lose the zero-downtime guarantee) with:

```
healthcheck:
  cord: false
```

## [Custom port for the healthcheck with multiple apps](#custom-port-for-the-healthcheck-with-multiple-apps)

Healthcheck is binding containers port to server's port. When running multiple applications on the same server and deploying them in parallel you should specify different port for each application.

```yaml
healthcheck:
  exposed_port: 4000 # 3999 is the default one
```

This allows you to run multiple applications on the same server sharing the same Traefik instance and port
