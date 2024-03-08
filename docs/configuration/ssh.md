---
title: SSH
---

# SSH

## [Using a different SSH user than root](#using-a-different-ssh-user-than-root)

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

## [Using a different SSH port](#using-a-different-ssh-port)

The default SSH port is 22, but you can change it using `ssh/port`:

```yaml
ssh:
  port: 2222
```

## [Using a proxy SSH host](#using-a-proxy-ssh-host)

If you need to connect to server through a proxy host, you can use `ssh/proxy`:

```yaml
ssh:
  proxy: "192.168.0.1" # defaults to root as the user
```

Or with specific user:

```yaml
ssh:
  proxy: "app@192.168.0.1"
```

Also if you need specific proxy command to connect to the server:

```yaml
ssh:
  proxy_command: aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p' --region=us-east-1 ## ssh via aws ssm
```

## [Using a different SSH log level](#using-a-different-ssh-log-level)

```yaml
ssh:
  log_level: debug
```

Valid levels are `debug`, `info`, `warn`, `error` and `fatal` (default).
