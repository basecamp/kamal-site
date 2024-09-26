---
title: Proxy
---

# kamal proxy

Kamal uses [kamal-proxy](https://github.com/basecamp/kamal-proxy) to proxy requests to the application containers, allowing us to have zero-downtime deployments.

```bash
$ kamal proxy
Commands:
  kamal proxy boot            # Boot proxy on servers
  kamal proxy boot_config <set|get|reset>  # Mange kamal-proxy boot configuration
  kamal proxy details         # Show details about proxy container from servers
  kamal proxy help [COMMAND]  # Describe subcommands or one specific subcommand
  kamal proxy logs            # Show log lines from proxy on servers
  kamal proxy reboot          # Reboot proxy on servers (stop container, remove container, start new container)
  kamal proxy remove          # Remove proxy container and image from servers
  kamal proxy restart         # Restart existing proxy container on servers
  kamal proxy start           # Start existing proxy container on servers
  kamal proxy stop            # Stop existing proxy container on servers
```

When you want to upgrade kamal-proxy, you can call `kamal proxy reboot`. This is going to cause a small outage on each server and will prompt for confirmation.

You can use a rolling reboot with `kamal proxy reboot --rolling` to avoid restarting on all servers simultaneously.

You can also use [pre-proxy-reboot](../hooks/pre-proxy-reboot) and [post-proxy-reboot](../hooks/post-proxy-reboot) hooks to remove and add the servers to upstream load balancers as you reboot them.

## Boot configuration

You can manage boot configuration for kamal-proxy with `kamal proxy boot_config`

```
$ kamal proxy boot_config --help
Usage:
  kamal proxy boot_config <set|get|clear>

Options:
      [--publish], [--no-publish], [--skip-publish]   # Publish the proxy ports on the host
                                                      # Default: true
      [--http-port=N]                                 # HTTP port to publish on the host
                                                      # Default: 80
      [--https-port=N]                                # HTTPS port to publish on the host
                                                      # Default: 443
      [--docker-options=option=value option2=value2]  # Docker options to pass to the proxy container
```

When set the config will be stored on the server the proxy runs on.

If you are running more than one application on a single server, there is only one proxy and the boot config is shared, so you'll need to manage the it centrally.

The configuration will be loaded at boot time, when calling `kamal proxy boot` or `kamal proxy reboot`.
