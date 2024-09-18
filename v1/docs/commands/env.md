---
title: Env
---

# kamal env

Manage your environment files.

`kamal env push` uses secrets configuration in `config/deploy.yml` and env variables from `.env` to create and push env files to your hosts. Those files are passed to containers when they are booted.

See also [`kamal envify`](../envify)

Example:

```bash
$ kamal env push
Running the pre-connect hook...
  INFO [96564f07] Running /usr/bin/env .kamal/hooks/pre-connect on localhost
  INFO [96564f07] Finished in 0.005 seconds with exit status 0 (successful).
  INFO [da7d250d] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [18892986] Running /usr/bin/env mkdir -p .kamal on server2
  INFO [0ed28dd9] Running /usr/bin/env mkdir -p .kamal on server3
  INFO [0ed28dd9] Finished in 0.198 seconds with exit status 0 (successful).
  INFO [da7d250d] Finished in 0.199 seconds with exit status 0 (successful).
  INFO [18892986] Finished in 0.199 seconds with exit status 0 (successful).
  INFO [860aaeb1] Running /usr/bin/env mkdir -p .kamal/locks on server1
  INFO [860aaeb1] Finished in 0.047 seconds with exit status 0 (successful).
Acquiring the deploy lock...
  INFO [f0dc3fac] Running /usr/bin/env mkdir -p .kamal/env/roles on server3
  INFO [bb61f315] Running /usr/bin/env mkdir -p .kamal/env/roles on server2
  INFO [067e5ff6] Running /usr/bin/env mkdir -p .kamal/env/roles on server1
  INFO [f0dc3fac] Finished in 0.045 seconds with exit status 0 (successful).
  INFO [bb61f315] Finished in 0.050 seconds with exit status 0 (successful).
  INFO [067e5ff6] Finished in 0.053 seconds with exit status 0 (successful).
  INFO Uploading .kamal/env/roles/app-workers.env 100.0%
  INFO Uploading .kamal/env/roles/app-web.env 100.0%
  INFO Uploading .kamal/env/roles/app-web.env 100.0%
  INFO [c6da2e19] Running /usr/bin/env mkdir -p .kamal/env/traefik on server1
  INFO [dafd2ca4] Running /usr/bin/env mkdir -p .kamal/env/traefik on server2
  INFO [dafd2ca4] Finished in 0.008 seconds with exit status 0 (successful).
  INFO [c6da2e19] Finished in 0.042 seconds with exit status 0 (successful).
  INFO Uploading .kamal/env/traefik/traefik.env 100.0%
  INFO Uploading .kamal/env/traefik/traefik.env 100.0%
  INFO [eee3dae0] Running /usr/bin/env mkdir -p .kamal/env/accessories on server1
  INFO [23d6641b] Running /usr/bin/env mkdir -p .kamal/env/accessories on server2
  INFO [23d6641b] Finished in 0.006 seconds with exit status 0 (successful).
  INFO [eee3dae0] Finished in 0.043 seconds with exit status 0 (successful).
  INFO Uploading .kamal/env/accessories/custom-busybox.env 100.0%
  INFO Uploading .kamal/env/accessories/custom-busybox.env 100.0%
Releasing the deploy lock...
```
