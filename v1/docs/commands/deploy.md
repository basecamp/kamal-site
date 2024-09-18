---
title: Deploy
---

# kamal deploy

Build and deploy your app to all servers. By default it will build the currently checked out version of the app.

Kamal will use the Traefik proxy to seamlessly move requests from the old version of the app to new without downtime.

The deployment process is:
1. Login into the docker registry locally and on all servers
2. Build the app image, push it to the registry and pull it onto the servers
3. Ensure Traefik is booted
4. Check the image boots on one server
5. Detect and stop any stale containers
6. Boot the new container and stop the old one
7. Prune old containers and images

```bash
Usage:
  kamal deploy

Options:
  -P, [--skip-push]                                  # Skip image build and push
                                                     # Default: false
  -v, [--verbose], [--no-verbose], [--skip-verbose]  # Detailed logging
  -q, [--quiet], [--no-quiet], [--skip-quiet]        # Minimal logging
      [--version=VERSION]                            # Run commands against a specific app version
  -p, [--primary], [--no-primary], [--skip-primary]  # Run commands only on primary host instead of all
  -h, [--hosts=HOSTS]                                # Run commands on these hosts instead of all (separate by comma, supports wildcards with *)
  -r, [--roles=ROLES]                                # Run commands on these roles instead of all (separate by comma, supports wildcards with *)
  -c, [--config-file=CONFIG_FILE]                    # Path to config file
                                                     # Default: config/deploy.yml
  -d, [--destination=DESTINATION]                    # Specify destination to be used for config file (staging -> deploy.staging.yml)
  -H, [--skip-hooks]                                 # Don't run hooks
                                                     # Default: false
```
