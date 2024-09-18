---
title: Config
---

# kamal config

Displays your config.

```bash
$ kamal config
---
:roles:
- web
:hosts:
- vm1
- vm2
:primary_host: vm1
:version: 505f4f60089b262c693885596fbd768a6ab663e9
:repository: registry:4443/app
:absolute_image: registry:4443/app:505f4f60089b262c693885596fbd768a6ab663e9
:service_with_version: app-505f4f60089b262c693885596fbd768a6ab663e9
:volume_args: []
:ssh_options:
  :user: root
  :port: 22
  :keepalive: true
  :keepalive_interval: 30
  :log_level: :fatal
:sshkit: {}
:builder:
  driver: docker
  arch: arm64
  args:
    COMMIT_SHA: 505f4f60089b262c693885596fbd768a6ab663e9
:accessories:
  busybox:
    service: custom-busybox
    image: registry:4443/busybox:1.36.0
    cmd: sh -c 'echo "Starting busybox..."; trap exit term; while true; do sleep 1;
      done'
    roles:
    - web
:logging:
- "--log-opt"
- max-size="10m"
```
