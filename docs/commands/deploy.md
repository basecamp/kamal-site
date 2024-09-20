---
title: Deploy
---

# kamal deploy

Build and deploy your app to all servers. By default it will build the currently checked out version of the app.

Kamal will use [kamal-proxy](https://github.com/basecamp/kamal-proxy) to seamlessly move requests from the old version of the app to new without downtime.

The deployment process is:
1. Login into the docker registry locally and on all servers
2. Build the app image, push it to the registry and pull it onto the servers
3. Ensure kamal-proxy is running and accepting traffic on ports 80 and 443.
4. Start a new container with the version of the app that matches the current git version hash.
5. Tell kamal-proxy to route traffic to the new container once it is responding with `200 OK` to `GET /up`
6. Stop the old container running the previous version of the app.
7. Prune unused images and stopped containers to ensure servers don't fill up.

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
