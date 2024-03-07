---
title: Using .env file to load required environment variables
---

# Using .env file to load required environment variables

Kamal uses [dotenv](https://github.com/bkeepers/dotenv) to automatically load environment variables set in the `.env` file present in the application root. This file can be used to set variables like `KAMAL_REGISTRY_PASSWORD` or database passwords. But for this reason you must ensure that .env files are not checked into Git or included in your Dockerfile! The format is just key-value like:

```bash
KAMAL_REGISTRY_PASSWORD=pw
DB_PASSWORD=secret123
```
