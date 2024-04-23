---
title: View all commands
---

# View all commands

You can view all of the commands by running `kamal --help`.

```
$ kamal --help
Commands:
  kamal accessory           # Manage accessories (db/redis/search)
  kamal app                 # Manage application
  kamal audit               # Show audit log from servers
  kamal build               # Build application image
  kamal config              # Show combined config (including secrets!)
  kamal deploy              # Deploy app to servers
  kamal details             # Show details about all containers
  kamal env                 # Manage environment files
  kamal envify              # Create .env by evaluating .env.erb (or .env.staging.erb -> .env.staging when using -d staging)
  kamal healthcheck         # Healthcheck application
  kamal help [COMMAND]      # Describe available commands or one specific command
  kamal init                # Create config stub in config/deploy.yml and env stub in .env
  kamal lock                # Manage the deploy lock
  kamal prune               # Prune old application images and containers
  kamal redeploy            # Deploy app to servers without bootstrapping servers, starting Traefik, pruning, and registry login
  kamal registry            # Login and -out of the image registry
  kamal remove              # Remove Traefik, app, accessories, and registry session from servers
  kamal rollback [VERSION]  # Rollback app to VERSION
  kamal server              # Bootstrap servers with curl and Docker
  kamal setup               # Setup all accessories, push the env, and deploy app to servers
  kamal traefik             # Manage Traefik load balancer
  kamal version             # Show Kamal version

Options:
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
