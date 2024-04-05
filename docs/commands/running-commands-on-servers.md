---
title: Running commands on servers
---

# Running commands on servers

## [Run command on all servers](#run-command-on-all-servers)

```bash
$ kamal app exec 'ruby -v'
App Host: 192.168.0.1
ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]

App Host: 192.168.0.2
ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x86_64-linux]
```

## [Run command on primary server](#run-command-on-primary-server)

```bash
$ kamal app exec --primary 'cat .ruby-version'
App Host: 192.168.0.1
3.1.3
```

## [Run Rails command on all servers](#run-rails-command-on-all-servers)

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

## [Run Rails runner on primary server](#run-rails-runner-on-primary-server)

```bash
$ kamal app exec -p 'bin/rails runner "puts Rails.application.config.time_zone"'
UTC
```

## [Run interactive commands over SSH](#run-interactive-commands-over-ssh)

You can run interactive commands, like a Rails console or a bash session, on a server (default is primary, use `--hosts` to connect to another).

Start a bash session in a new container made from the most recent app image:

```bash
kamal app exec -i bash
```

Start a bash session in the currently running container for the app:

```bash
kamal app exec -i --reuse bash
```

Start a Rails console in a new container made from the most recent app image:

```bash
kamal app exec -i 'bin/rails console'
```

