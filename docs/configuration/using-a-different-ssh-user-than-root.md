---
title: Using a different SSH user than root
---

# Using a different SSH user than root

The default SSH user is root, but you can change it using `ssh/user`:

```yaml
ssh:
  user: app
```

If you are using non-root user (`app` as above example), you need to bootstrap your servers manually, before using them with Kamal. On Ubuntu, you'd do:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y docker.io curl git
sudo usermod -a -G docker app
```
