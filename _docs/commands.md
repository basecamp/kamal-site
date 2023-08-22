---
title: Commands
order: 3
---

# Commands

## Running commands on servers

#### Run command on all servers

```bash
$ kamal app exec 'ruby -v'
App Host: 192.168.0.1
ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]

App Host: 192.168.0.2
ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]
```

#### Run command on primary server
```bash
$ kamal app exec --primary 'cat .ruby-version'
App Host: 192.168.0.1
3.1.3
```

#### Run Rails command on all servers
```bash
$ kamal app exec 'bin/rails about'
App Host: 192.168.0.1
About your application's environment
Rails version             7.1.0.alpha
Ruby version              ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]
RubyGems version          3.3.26
Rack version              2.2.5
Middleware                ActionDispatch::HostAuthorization, Rack::Sendfile, ActionDispatch::Static, ActionDispatch::Executor, Rack::Runtime, Rack::MethodOverride, ActionDispatch::RequestId, ActionDispatch::RemoteIp, Rails::Rack::Logger, ActionDispatch::ShowExceptions, ActionDispatch::DebugExceptions, ActionDispatch::Callbacks, ActionDispatch::Cookies, ActionDispatch::Session::CookieStore, ActionDispatch::Flash, ActionDispatch::ContentSecurityPolicy::Middleware, ActionDispatch::PermissionsPolicy::Middleware, Rack::Head, Rack::ConditionalGet, Rack::ETag, Rack::TempfileReaper
Application root          /rails
Environment               production
Database adapter          sqlite3
Database schema version   20221231233303

App Host: 192.168.0.2
About your application's environment
Rails version             7.1.0.alpha
Ruby version              ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]
RubyGems version          3.3.26
Rack version              2.2.5
Middleware                ActionDispatch::HostAuthorization, Rack::Sendfile, ActionDispatch::Static, ActionDispatch::Executor, Rack::Runtime, Rack::MethodOverride, ActionDispatch::RequestId, ActionDispatch::RemoteIp, Rails::Rack::Logger, ActionDispatch::ShowExceptions, ActionDispatch::DebugExceptions, ActionDispatch::Callbacks, ActionDispatch::Cookies, ActionDispatch::Session::CookieStore, ActionDispatch::Flash, ActionDispatch::ContentSecurityPolicy::Middleware, ActionDispatch::PermissionsPolicy::Middleware, Rack::Head, Rack::ConditionalGet, Rack::ETag, Rack::TempfileReaper
Application root          /rails
Environment               production
Database adapter          sqlite3
Database schema version   20221231233303
```

#### Run Rails runner on primary server
```bash
$ kamal app exec -p 'bin/rails runner "puts Rails.application.config.time_zone"'
UTC
```

## Running interactive commands over SSH

You can run interactive commands, like a Rails console or a bash session, on a server (default is primary, use `--hosts` to connect to another):

```bash
# Starts a bash session in a new container made from the most recent app image
kamal app exec -i bash

# Starts a bash session in the currently running container for the app
kamal app exec -i --reuse bash

# Starts a Rails console in a new container made from the most recent app image
kamal app exec -i 'bin/rails console'
```


## Running details to show state of containers

You can see the state of your servers by running `kamal details`:

```
Traefik Host: 192.168.0.1
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                               NAMES
6195b2a28c81   traefik   "/entrypoint.sh --pr…"   30 minutes ago   Up 19 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   traefik

Traefik Host: 192.168.0.2
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                               NAMES
de14a335d152   traefik   "/entrypoint.sh --pr…"   30 minutes ago   Up 19 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   traefik

App Host: 192.168.0.1
CONTAINER ID   IMAGE                                                                         COMMAND                  CREATED          STATUS          PORTS      NAMES
badb1aa51db3   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e…"   13 minutes ago   Up 13 minutes   3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123

App Host: 192.168.0.2
CONTAINER ID   IMAGE                                                                         COMMAND                  CREATED          STATUS          PORTS      NAMES
1d3c91ed1f55   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e…"   13 minutes ago   Up 13 minutes   3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123
```

You can also see just info for app containers with `kamal app details` or just for Traefik with `kamal traefik details`.

## Running rollback to fix a bad deploy

If you've discovered a bad deploy, you can quickly rollback by reactivating the old, paused container image. You can see what old containers are available for rollback by running `kamal app containers`. It'll give you a presentation similar to `kamal app details`, but include all the old containers as well. Showing something like this:

```
App Host: 192.168.0.1
CONTAINER ID   IMAGE                                                                         COMMAND                  CREATED          STATUS                      PORTS      NAMES
1d3c91ed1f51   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e…"   19 minutes ago   Up 19 minutes               3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123
539f26b28369   registry.digitalocean.com/user/app:e5d9d7c2b898289dfbc5f7f1334140d984eedae4   "/rails/bin/docker-e…"   31 minutes ago   Exited (1) 27 minutes ago              chat-e5d9d7c2b898289dfbc5f7f1334140d984eedae4

App Host: 192.168.0.2
CONTAINER ID   IMAGE                                                                         COMMAND                  CREATED          STATUS                      PORTS      NAMES
badb1aa51db4   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e…"   19 minutes ago   Up 19 minutes               3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123
6f170d1172ae   registry.digitalocean.com/user/app:e5d9d7c2b898289dfbc5f7f1334140d984eedae4   "/rails/bin/docker-e…"   31 minutes ago   Exited (1) 27 minutes ago              chat-e5d9d7c2b898289dfbc5f7f1334140d984eedae4
```

From the example above, we can see that `e5d9d7c2b898289dfbc5f7f1334140d984eedae4` was the last version, so it's available as a rollback target. We can perform this rollback by running `kamal rollback e5d9d7c2b898289dfbc5f7f1334140d984eedae4`. That'll stop `6ef8a6a84c525b123c5245345a8483f86d05a123` and then start `e5d9d7c2b898289dfbc5f7f1334140d984eedae4`. Because the old container is still available, this is very quick. Nothing to download from the registry.

**Note:** By default old containers are pruned after 3 days when you run `kamal deploy`.

## Running removal to clean up servers

If you wish to remove the entire application, including Traefik, containers, images, and registry session, you can run `kamal remove`. This will leave the servers clean.

## Rebooting Traefik

If you make changes to Traefik args or labels, you'll need to reboot with:

`kamal traefik reboot`

In production, reboot the Traefik containers one by one with a slower but safer approach, using a rolling reboot:

`kamal traefik reboot --rolling`


## Checking and setting the lock

Commands that are unsafe to run concurrently will take a deploy lock while they run. The lock is the `kamal_lock` directory on the primary server.

You can check the lock status with:

```
kamal lock status

Locked by: AN Other at 2023-03-24 09:49:03 UTC
Version: 77f45c0686811c68989d6576748475a60bf53fc2
Message: Automatic deploy lock
```

You can also manually acquire and release the lock:

```
kamal lock acquire -m "Doing maintanence"
```

```
kamal lock release
```
