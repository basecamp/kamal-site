---
title: Running interactive commands over SSH
---

# Running interactive commands over SSH

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
