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

## [Using GCP Artifact Registry as the container registry](#using-gcp-artifact-registry-as-the-container-registry)

To sign into Artifact Registry, you would need to [create a service account](https://cloud.google.com/iam/docs/service-accounts-create#creating) and set up [roles and permissions](https://cloud.google.com/artifact-registry/docs/access-control#permissions). Normally, assigning a `roles/artifactregistry.writer` role should be sufficient.

Once the service account is ready, you need to generate and download a JSON key, base64 encode it and add to `.env`:

```bash
echo "KAMAL_REGISTRY_PASSWORD=$(base64 -i /path/to/key.json)" | tr -d "\\n"  >> .env
```

Use the env variable as `password` along with `_json_key_base64` as `username`.

You would also need to specify the `image` and `server` variables based on your repo project and location. Here's the final configuration:

```yaml
image: <your gcp project id>/<artifact registry repo name>/<desired image name>
registry:
  server: <your registry region>-docker.pkg.dev
  username: _json_key_base64
  password:
    - KAMAL_REGISTRY_PASSWORD
```

## [Validating the registry configuration](#validating-the-registry-configuration)

After you're done with the custom setup, use this to ensure your configuration is correct:

```bash
kamal registry login
```
