---
title: Details
---

# kamal details

Shows details of all your containers.

```bash
$ kamal details -q
Traefik Host: server2
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS          PORTS                NAMES
b220af815ea7   registry:4443/traefik:v2.10   "/entrypoint.sh --pr…"   52 minutes ago   Up 52 minutes   0.0.0.0:80->80/tcp   traefik

Traefik Host: server1
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS          PORTS                NAMES
e0abb837120a   registry:4443/traefik:v2.10   "/entrypoint.sh --pr…"   52 minutes ago   Up 52 minutes   0.0.0.0:80->80/tcp   traefik

App Host: server2
CONTAINER ID   IMAGE                                                        COMMAND                  CREATED          STATUS                    PORTS     NAMES
3ec7c8122988   registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac   "/docker-entrypoint.…"   52 minutes ago   Up 52 minutes (healthy)   80/tcp    app-web-75bf6fa40b975cbd8aec05abf7164e0982f185ac

App Host: server1
CONTAINER ID   IMAGE                                                        COMMAND                  CREATED          STATUS                    PORTS     NAMES
32ae39c98b29   registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac   "/docker-entrypoint.…"   52 minutes ago   Up 52 minutes (healthy)   80/tcp    app-web-75bf6fa40b975cbd8aec05abf7164e0982f185ac

App Host: server3
CONTAINER ID   IMAGE                                                        COMMAND                  CREATED          STATUS          PORTS     NAMES
df8990876d14   registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac   "/docker-entrypoint.…"   52 minutes ago   Up 52 minutes   80/tcp    app-workers-75bf6fa40b975cbd8aec05abf7164e0982f185ac

CONTAINER ID   IMAGE                          COMMAND                   CREATED          STATUS          PORTS     NAMES
14857a6cb6b1   registry:4443/busybox:1.36.0   "sh -c 'echo \"Starti…"   42 minutes ago   Up 42 minutes             custom-busybox
CONTAINER ID   IMAGE                          COMMAND                   CREATED          STATUS          PORTS     NAMES
17f3ff88ff9f   registry:4443/busybox:1.36.0   "sh -c 'echo \"Starti…"   42 minutes ago   Up 42 minutes             custom-busybox
```
