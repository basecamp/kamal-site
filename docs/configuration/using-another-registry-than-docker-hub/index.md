---
title: Using another registry than Docker Hub
---

# Using another registry than Docker Hub

The default registry is Docker Hub, but you can change it using `registry/server`:

```yaml
registry:
  server: registry.digitalocean.com
  username:
    - DOCKER_REGISTRY_TOKEN
  password:
    - DOCKER_REGISTRY_TOKEN
```

A reference to secret `DOCKER_REGISTRY_TOKEN` will look for `ENV["DOCKER_REGISTRY_TOKEN"]` on the machine running Kamal.

## [Using AWS ECR as the container registry](#using-aws-ecr-as-the-container-registry)

AWS ECR's access token is only valid for 12hrs. In order to not have to manually regenerate the token every time, you can use ERB in the `deploy.yml` file to shell out to the `aws` cli command, and obtain the token:

```yaml
registry:
  server: <your aws account id>.dkr.ecr.<your aws region id>.amazonaws.com
  username: AWS
  password: <%= %x(aws ecr get-login-password) %>
```

You will need to have the `aws` CLI installed locally for this to work.
