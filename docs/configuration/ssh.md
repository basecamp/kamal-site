---
title: SSH configuration
---

# SSH configuration

Kamal uses SSH to connect run commands on your hosts. By default it will attempt to connect to the root user on port 22.

If you are using non-root user, you may need to bootstrap your servers manually, before using them with Kamal. On Ubuntu, you’d do:

```shell
sudo apt update
sudo apt upgrade -y
sudo apt install -y docker.io curl git
sudo usermod -a -G docker app
```

## [SSH options](#ssh-options)

The options are specified under the ssh key in the configuration file.

```yaml
ssh:
```

## [The SSH user](#the-ssh-user)

Defaults to `root`:

```yaml
  user: app
```

## [The SSH port](#the-ssh-port)

Defaults to 22:

```yaml
  port: "2222"
```

## [Proxy host](#proxy-host)

Specified in the form <host> or <user>@<host>:

```yaml
  proxy: root@proxy-host
```

## [Proxy command](#proxy-command)

A custom proxy command, required for older versions of SSH:

```yaml
  proxy_command: "ssh -W %h:%p user@proxy"
```

## [Log level](#log-level)

Defaults to `fatal`. Set this to debug if you are having SSH connection issues.

```yaml
  log_level: debug
```

## [Keys only](#keys-only)

Set to true to use only private keys from keys and key_data parameters, even if ssh-agent offers more identities. This option is intended for situations where ssh-agent offers many different identities or you have a need to overwrite all identities and force a single one.

```yaml
  keys_only: false
```

## [Keys](#keys)

An array of file names of private keys to use for publickey and hostbased authentication:

```yaml
  keys: [ "~/.ssh/id.pem" ]
```

## [Key data](#key-data)

An array of strings, with each element of the array being a raw private key in PEM format.

```yaml
  key_data: [ "-----BEGIN OPENSSH PRIVATE KEY-----" ]
```
