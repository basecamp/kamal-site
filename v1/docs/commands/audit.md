---
title: Audit
---

# kamal audit

Show the latest commands to have been run on each server.

```bash
$ kamal audit
 kamal audit
  INFO [1ec52bf7] Running /usr/bin/env tail -n 50 .kamal/app-audit.log on server2
  INFO [54911c10] Running /usr/bin/env tail -n 50 .kamal/app-audit.log on server1
  INFO [2f3d32d0] Running /usr/bin/env tail -n 50 .kamal/app-audit.log on server3
  INFO [2f3d32d0] Finished in 0.232 seconds with exit status 0 (successful).
App Host: server3
[2024-04-05T07:14:23Z] [user] Pushed env files
[2024-04-05T07:14:29Z] [user] Pulled image with version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:45Z] [user] [workers] Booted app version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:53Z] [user] Tagging registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac as the latest image
[2024-04-05T07:14:53Z] [user] Pruned containers
[2024-04-05T07:14:53Z] [user] Pruned images

  INFO [54911c10] Finished in 0.232 seconds with exit status 0 (successful).
App Host: server1
[2024-04-05T07:14:23Z] [user] Pushed env files
[2024-04-05T07:14:29Z] [user] Pulled image with version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:45Z] [user] [web] Booted app version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:53Z] [user] Tagging registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac as the latest image
[2024-04-05T07:14:53Z] [user] Pruned containers
[2024-04-05T07:14:53Z] [user] Pruned images

  INFO [1ec52bf7] Finished in 0.233 seconds with exit status 0 (successful).
App Host: server2
[2024-04-05T07:14:23Z] [user] Pushed env files
[2024-04-05T07:14:29Z] [user] Pulled image with version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:45Z] [user] [web] Booted app version 75bf6fa40b975cbd8aec05abf7164e0982f185ac
[2024-04-05T07:14:53Z] [user] Tagging registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac as the latest image
[2024-04-05T07:14:53Z] [user] Pruned containers
[2024-04-05T07:14:53Z] [user] Pruned images
```
