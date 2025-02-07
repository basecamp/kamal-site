---
title: Secrets
---

# kamal secrets

```bash
$ kamal secrets
Commands:
  kamal secrets extract                                                     # Extract a single secret from the results of a fetch call
  kamal secrets fetch [SECRETS...] --account=ACCOUNT -a, --adapter=ADAPTER  # Fetch secrets from a vault
  kamal secrets help [COMMAND]                                              # Describe subcommands or one specific subcommand
  kamal secrets print                                                       # Print the secrets (for debugging)
```

Use these to read secrets from common password managers (currently 1Password, LastPass, and Bitwarden).

The helpers will handle signing in, asking for passwords, and efficiently fetching the secrets:

These are designed to be used with [command substitution](https://github.com/bkeepers/dotenv?tab=readme-ov-file#command-substitution) in `.kamal/secrets`

```shell
# .kamal/secrets

SECRETS=$(kamal secrets fetch ...)

REGISTRY_PASSWORD=$(kamal secrets extract REGISTRY_PASSWORD $SECRETS)
DB_PASSWORD=$(kamal secrets extract DB_PASSWORD $SECRETS)
```

## 1Password

First, install and configure [the 1Password CLI](https://developer.1password.com/docs/cli/get-started/).

Use the adapter `1password`:

```bash
# Fetch from item `MyItem` in the vault `MyVault`
kamal secrets fetch --adapter 1password --account myaccount --from MyVault/MyItem REGISTRY_PASSWORD DB_PASSWORD

# Fetch from sections of item `MyItem` in the vault `MyVault`
kamal secrets fetch --adapter 1password --account myaccount --from MyVault/MyItem common/REGISTRY_PASSWORD production/DB_PASSWORD

# Fetch from separate items MyItem, MyItem2
kamal secrets fetch --adapter 1password --account myaccount --from MyVault MyItem/REGISTRY_PASSWORD MyItem2/DB_PASSWORD

# Fetch from multiple vaults
kamal secrets fetch --adapter 1password --account myaccount MyVault/MyItem/REGISTRY_PASSWORD MyVault2/MyItem2/DB_PASSWORD

# All three of these will extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyVault/MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

## LastPass

First, install and configure [the LastPass CLI](https://github.com/lastpass/lastpass-cli).

Use the adapter `lastpass`:

```bash
# Fetch passwords
kamal secrets fetch --adapter lastpass --account email@example.com REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from a folder
kamal secrets fetch --adapter lastpass --account email@example.com --from MyFolder REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from multiple folders
kamal secrets fetch --adapter lastpass --account email@example.com MyFolder/REGISTRY_PASSWORD MyFolder2/DB_PASSWORD

# Extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyFolder/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

## Bitwarden

First, install and configure [the Bitwarden CLI](https://bitwarden.com/help/cli/).

Use the adapter `bitwarden`:

```bash
# Fetch passwords
kamal secrets fetch --adapter bitwarden --account email@example.com REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from an item
kamal secrets fetch --adapter bitwarden --account email@example.com --from MyItem REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from multiple items
kamal secrets fetch --adapter bitwarden --account email@example.com MyItem/REGISTRY_PASSWORD MyItem2/DB_PASSWORD

# Extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

## Bitwarden Secrets Manager

First, install and configure [the Bitwarden Secrets Manager CLI](https://bitwarden.com/help/secrets-manager-cli/#download-and-install).

Use the adapter 'bitwarden-sm':

```bash
# Fetch all secrets that the machine account has access to
kamal secrets fetch --adapter bitwarden-sm all

# Fetch secrets from a project
kamal secrets fetch --adapter bitwarden-sm MyProjectID/all

# Extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

## AWS Secrets Manager

First, install and configure [the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Use the adapter `aws_secrets_manager`:

```bash
# Fetch passwords
kamal secrets fetch --adapter aws_secrets_manager --account default REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from an item
kamal secrets fetch --adapter aws_secrets_manager --account default --from myapp/ REGISTRY_PASSWORD DB_PASSWORD

# Fetch passwords from multiple items
kamal secrets fetch --adapter aws_secrets_manager --account default myapp/REGISTRY_PASSWORD myapp/DB_PASSWORD

# Extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

**Note:** The `--account` option should be set to your AWS CLI profile name, which is typically `default`. Ensure that your AWS CLI is configured with the necessary permissions to access AWS Secrets Manager.

## Doppler

First, install and configure [the Doppler CLI](https://docs.doppler.com/docs/install-cli).

Use the adapter `doppler`:

```bash
# Fetch passwords
kamal secrets fetch --adapter doppler --from my-project/prd REGISTRY_PASSWORD DB_PASSWORD

# The project/config pattern is also supported in this way
kamal secrets fetch --adapter doppler my-project/prd/REGISTRY_PASSWORD my-project/prd/DB_PASSWORD

# Extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract DB_PASSWORD <SECRETS-FETCH-OUTPUT>
```

Doppler organizes secrets in "projects" (like `my-awesome-project`) and "configs" (like `prod`, `stg`, etc), use the pattern `project/config` when defining the `--from` option.

The doppler adapter does not use the `--account` option, if given it will be ignored.

## GCP Secret Manager

First, install and configure the [gcloud CLI](https://cloud.google.com/sdk/gcloud/reference/secrets).

The `--account` flag selects an account configured in `gcloud`, and the `--from` flag specifies the **GCP project ID** to be used. The string `default` can be used with the `--account` and `--from` flags to use `gcloud`'s default credentials and project, respectively.

Use the adapter `gcp`:

```bash
# Fetch a secret with an explicit project name, credentials, and secret version:
kamal secrets fetch --adapter=gcp --account=default --from=default my-secret/latest

# The project name can be added as a prefix to the secret name instead of using --from:
kamal secrets fetch --adapter=gcp --account=default default/my-secret/latest

# The 'latest' version is used by default, so it can be omitted as well:
kamal secrets fetch --adapter=gcp --account=default default/my-secret

# If the default project is used, the prefix can also be left out entirely, leading to the simplest
# way to fetch a secret using the default project and credentials, and the latest version of the
# secret:
kamal secrets fetch --adapter=gcp --account=default my-secret

# Multiple secrets can be fetched at the same time.
# Fetch `my-secret` and `another-secret` from the project `my-project`:
kamal secrets fetch --adapter=gcp \
  --account=default \
  --from=my-project \
  my-secret another-secret

# Secrets can be fetched from multiple projects at the same time.
# Fetch from multiple projects, using default to refer to the default project:
kamal secrets fetch --adapter=gcp \
  --account=default \
  default/my-secret my-project/another-secret

# Specific secret versions can be fetched.
# Fetch version 123 of the secret `my-secret` in the default project (the default behavior is to
# fetch `latest`)
kamal secrets fetch --adapter=gcp \
  --account=default \
  default/my-secret/123

# Credentials other than the default can also be used.
# Fetch a secret using the `user@example.com` credentials:
kamal secrets fetch --adapter=gcp \
  --account=user@example.com \
  my-secret

# Service account impersonation and delegation chains are available.
# Fetch a secret as `user@example.com`, impersonating `service-account@example.com` with
# `delegate@example.com` as a delegate
kamal secrets fetch --adapter=gcp \
  --account="user@example.com|delegate@example.com,service-account@example.com" \
  my-secret
```
