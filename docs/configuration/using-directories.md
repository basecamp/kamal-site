---
title: Using directories
---

# Using directories

Directories act in a similar way to volumes except it will create a corresponding directory on the host before mounting the volume:

e.g.

```yaml
service: kamal-demo
accessories:
  db:
    # ...
    directories:
      - data:/var/lib/mysql
```

will run `mkdir` first ...

```
Running /usr/bin/env mkdir -p $PWD/kamal-demo-db/data
```

and then it will mount the volume ...

```
docker run ... --volume $PWD/kamal-demo-db/data:/var/lib/mysql
```
