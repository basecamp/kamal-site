---
title: Guides & Tutorials
order: 5
---

# Guides & Tutorials

Most of the configurations are the same, here are few examples that you can adapt according to your needs.

## Common accessories configurations

### PostgreSQL

```yml
accessories:
  db:
    image: postgres:15
    host: 192.168.0.1
    port: 5432:5432
    env:
      secret:
        - DATABASE_URL
    files:
      - config/init.sql:/docker-entrypoint-initdb.d/setup.sql
    directories:
      - data:/var/lib/postgresql/data
```

With `config/init.sql` as:
```sql
--  config/init.sql
CREATE DATABASE myapp_production;
```

### MySQL

```yml
accessories:
  db:
    image: mysql:5.7
    host: 192.168.0.1
    port: 3306:3306
    env:
      clear:
        MYSQL_ROOT_HOST: '%'
      secret:
        - MYSQL_ROOT_PASSWORD
    directories:
      - data:/var/lib/mysql
```

### Redis

```yml
accessories:
  redis:
    image: redis:latest
    port: 6379:6379
    volumes:
      - cache:/data
```
