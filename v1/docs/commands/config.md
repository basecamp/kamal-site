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
- workers
:hosts:
- server1
- server2
- server3
:primary_host: server1
:version: 75bf6fa40b975cbd8aec05abf7164e0982f185ac
:repository: registry:4443/app
:absolute_image: registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac
:service_with_version: app-75bf6fa40b975cbd8aec05abf7164e0982f185ac
:volume_args: []
:ssh_options:
  :user: root
  :port: 22
  :keepalive: true
  :keepalive_interval: 30
  :log_level: :fatal
:sshkit: {}
:builder:
  multiarch: false
  args:
    COMMIT_SHA: 75bf6fa40b975cbd8aec05abf7164e0982f185ac
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
:healthcheck:
  path: "/up"
  port: 3000
  max_attempts: 7
  exposed_port: 3999
  cord: "/tmp/kamal-cord"
  log_lines: 50
  cmd: wget -qO- http://localhost > /dev/null || exit 1
```
