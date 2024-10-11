---
title: Installation
---

# Installation

If you have a Ruby environment available, you can install Kamal globally with:

```sh
gem install kamal
```

Otherwise, you can run a dockerized version via an alias (add this to your `~/.bashrc` or similar to simplify reuse).

On macOS, use:

```sh
alias kamal='docker run -it --rm -v "${PWD}:/workdir" -v "/run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock" -v "$HOME/.ssh:/root/.ssh" -e SSH_AUTH_SOCK="/run/host-services/ssh-auth.sock" -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/basecamp/kamal:latest'
```

On Linux, use:

```sh
alias kamal='docker run -it --rm -v "${PWD}:/workdir" -v "${SSH_AUTH_SOCK}:/ssh-agent" -v /var/run/docker.sock:/var/run/docker.sock -e "SSH_AUTH_SOCK=/ssh-agent" ghcr.io/basecamp/kamal:latest'
```

Then, inside your app directory, run `kamal init`. Now edit the new file `config/deploy.yml`. It could look as simple as this:

```yaml
service: hey
image: 37s/hey
servers:
  - 192.168.0.1
  - 192.168.0.2
registry:
  username: registry-user-name
  password:
    - KAMAL_REGISTRY_PASSWORD
builder:
  arch: amd64
env:
  secret:
    - RAILS_MASTER_KEY
```

Set your `KAMAL_REGISTRY_PASSWORD` in your environment and edit your `.kamal/secrets` file to read it (and your `RAILS_MASTER_KEY` for production with a Rails app).

```yaml
KAMAL_REGISTRY_PASSWORD=$KAMAL_REGISTRY_PASSWORD
RAILS_MASTER_KEY=$(cat config/master.key)
```

Now you're ready to deploy to the servers:

```
kamal setup
```

This will:

1. Connect to the servers over SSH (using root by default, authenticated by your SSH key).
2. Install Docker on any server that might be missing it (using get.docker.com): root access is needed via SSH for this.
3. Log into the registry both locally and remotely.
4. Build the image using the standard Dockerfile in the root of the application.
5. Push the image to the registry.
6. Pull the image from the registry onto the servers.
7. Ensure kamal-proxy is running and accepting traffic on ports 80 and 443.
8. Start a new container with the version of the app that matches the current Git version hash.
9. Tell kamal-proxy to route traffic to the new container once it is responding with `200 OK` to `GET /up`.
10. Stop the old container running the previous version of the app.
11. Prune unused images and stopped containers to ensure servers don't fill up.

Voila! All the servers are now serving the app on port 80. If you're just running a single server, you're ready to go. If you're running multiple servers, you need to put a load balancer in front of them. For subsequent deploys, or if your servers already have Docker installed, you can just run `kamal deploy`.
