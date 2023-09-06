---
title: Installation
order: 1
---

# Installation

If you have a Ruby environment available, you can install Kamal globally with:

```sh
gem install kamal
```

...otherwise, you can run a dockerized version via an alias to simplify re-use:

For `bash`, add this to your `.bashrc`:
```sh
alias kamal="docker run -it --rm -v '${PWD}:/workdir' -v '${SSH_AUTH_SOCK}:/ssh-agent' -v /var/run/docker.sock:/var/run/docker.sock -e 'SSH_AUTH_SOCK=/ssh-agent' ghcr.io/basecamp/kamal:latest"
```

For `zsh`, add this to your `.zshrc`:
```sh
alias kamal='docker run -it --rm -v ${PWD}:/workdir -v ${SSH_AUTH_SOCK}:/ssh-agent -v /var/run/docker.sock:/var/run/docker.sock -e SSH_AUTH_SOCK=/ssh-agent ghcr.io/basecamp/kamal:latest'
```

Then, inside your app directory, run `kamal init` (or `kamal init --bundle` within Rails 7+ apps where you want a bin/kamal binstub). Now edit the new file `config/deploy.yml`. It could look as simple as this:

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
env:
  secret:
    - RAILS_MASTER_KEY
```

Then edit your `.env` file to add your registry password as `KAMAL_REGISTRY_PASSWORD` (and your `RAILS_MASTER_KEY` for production with a Rails app).

Now you're ready to deploy to the servers:

```
kamal setup
```

This will:

1. Connect to the servers over SSH (using root by default, authenticated by your ssh key)
2. Install Docker and curl on any server that might be missing it (using apt-get): root access is needed via ssh for this.
3. Log into the registry both locally and remotely
4. Build the image using the standard Dockerfile in the root of the application.
5. Push the image to the registry.
6. Pull the image from the registry onto the servers.
7. Ensure Traefik is running and accepting traffic on port 80.
8. Ensure your app responds with `200 OK` to `GET /up` (you must have curl installed inside your app image!).
9. Start a new container with the version of the app that matches the current git version hash.
10. Stop the old container running the previous version of the app.
11. Prune unused images and stopped containers to ensure servers don't fill up.

Voila! All the servers are now serving the app on port 80. If you're just running a single server, you're ready to go. If you're running multiple servers, you need to put a load balancer in front of them. For subsequent deploys, or if your servers already have Docker and curl installed, you can just run `kamal deploy`.

### Rails <7 usage

Kamal is not needed to be in your application Gemfile to be used. However, if you want to guarantee specific Kamal version in your CI/CD workflows, you can create a separate Gemfile for Kamal, for example, `gemfile/kamal.gemfile`:

```ruby
source 'https://rubygems.org'

gem 'kamal', '~> 0.14'
```

Bundle with `BUNDLE_GEMFILE=gemfiles/kamal.gemfile bundle`.

After this Kamal can be used for deployment:

```sh
BUNDLE_GEMFILE=gemfiles/kamal.gemfile bundle exec kamal deploy
```
