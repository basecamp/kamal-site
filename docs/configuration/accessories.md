---
title: Using accessories for database, cache, search services
---

# Accessories

## [Using accessories for database, cache, search services](#using-accessories-for-database-cache-search-services)

You can manage your accessory services via Kamal as well. Accessories are long-lived services that your app depends on. They are not updated when you deploy.

```yaml
accessories:
  mysql:
    image: mysql:5.7
    host: 1.1.1.3
    port: 3306
    env:
      clear:
        MYSQL_ROOT_HOST: '%'
      secret:
        - MYSQL_ROOT_PASSWORD
    volumes:
      - /var/lib/mysql:/var/lib/mysql
    options:
      cpus: 4
      memory: "2GB"
  redis:
    image: redis:latest
    roles:
      - web
    port: "36379:6379"
    volumes:
      - /var/lib/redis:/data
  internal-example:
    image: registry.digitalocean.com/user/otherservice:latest
    host: 1.1.1.5
    port: 44444
```

The hosts that the accessories will run on can be specified by hosts or roles:

```yaml
  # Single host
  mysql:
    host: 1.1.1.1
  # Multiple hosts
  redis:
    hosts:
      - 1.1.1.1
      - 1.1.1.2
  # By role
  monitoring:
    roles:
      - web
      - jobs
```

Now run `kamal accessory boot mysql` to start the MySQL server on 1.1.1.3. See `kamal accessory` for all the commands possible.

Accessory images must be public or tagged in your private registry.

## [Using directories](#using-directories)

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

## [Using volumes](#using-volumes)

You can add custom volumes into the app containers using `volumes`:

```yaml
volumes:
  - "/local/path:/container/path"
```

## [Security](#security)

Please note that, by default, Kamal exposes your accessories through a public IP. Therefore, you should secure them with a firewall or passwords. If your hosting provider supports private networking, you can expose services using a private IP, making them accessible only from within the same network:

```yaml
  redis:
    image: redis:latest
    roles:
      - web
    port: "192.168.1.100:36379:6379" # where 192.168.1.100 is the private IP of the server
    volumes:
      - /var/lib/redis:/data
```
