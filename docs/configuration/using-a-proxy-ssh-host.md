---
title: Using a proxy SSH host
---

# Using a proxy SSH host

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
