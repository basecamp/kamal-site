---
title: Using accessories for database, cache, search services
---

# Using accessories for database, cache, search services

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

Now run `kamal accessory start mysql` to start the MySQL server on 1.1.1.3. See `kamal accessory` for all the commands possible.

Accessory images must be public or tagged in your private registry.
