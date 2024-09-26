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
```

Use these to read secrets from common password managers (currently 1Password, LastPass and Bitwarden).

The helpers will handle signing in, asking for passwords and efficiently fetching the secrets:

These are designed to be used with [command substitution](https://github.com/bkeepers/dotenv?tab=readme-ov-file#command-substitution) in `.kamal/secrets`

```
# .kamal/secrets

SECRETS=$(kamal secrets fetch ...)

REGISTRY_PASSWORD=$(kamal secrets extract REGISTRY_PASSWORD $SECRETS)
DB_PASSWORD=$(kamal secrets extract DB_PASSWORD $SECRETS)
```

## 1Password

Use the adaptor `1password`:

```
# Fetch from item `MyItem` in the vault `MyVault`
kamal secrets fetch --adapter 1password --account myaccount --from MyVault/MyItem REGISTRY_PASSWORD DB_PASSWORD

# Fetch from sections of item `MyItem` in the vault `MyVault`
kamal secrets fetch --adapter 1password --account myaccount --from MyVault/MyItem common/REGISTRY_PASSWORD production/DB_PASSWORD

# Fetch from separate items MyItem, MyItem2
kamal secrets fetch --adapter 1password --account myaccount --from MyVault MyItem/REGISTRY_PASSWORD MyItem2/DB_PASSWORD

# Fetch from multiple vaults
kamal secrets fetch --adapter 1password --account myaccount  MyVault/MyItem/REGISTRY_PASSWORD MyVault2/MyItem2/DB_PASSWORD

# All three of these will extract the secret
kamal secrets extract REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
kamal secrets extract MyVault/MyItem/REGISTRY_PASSWORD <SECRETS-FETCH-OUTPUT>
```

## LastPass

Use the adaptor `lastpass`:

```
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

Use the adaptor `bitwarden`:

```
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
