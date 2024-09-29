---
title: Prune
---

# kamal prune

Prune old containers and images.

Kamal keeps the last 5 deployed containers and the images they are using. Pruning deletes all older containers and images.

```bash
$ kamal help prune
Commands:
  kamal prune all             # Prune unused images and stopped containers
  kamal prune containers      # Prune all stopped containers, except the last n (default 5)
  kamal prune help [COMMAND]  # Describe subcommands or one specific subcommand
  kamal prune images          # Prune unused images
```
