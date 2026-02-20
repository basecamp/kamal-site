---
title: pre-configure
---

# Hooks: pre-configure

Runs before configuration is created. This hook can inject or rewrite the deployment destination by writing `KAMAL_DESTINATION` to `$KAMAL_OUTPUT`.

Because config has not been created yet, this hook only receives a minimal environment:

- `KAMAL_DESTINATION` — the destination passed via `-d` (if any)
- `KAMAL_OUTPUT` — path to the [hook output file](/docs/hooks/overview/#hook-output)

The full set of `KAMAL_*` variables (hosts, roles, version, etc.) is not available to this hook.

### Rewriting a destination

If the hook writes `KAMAL_DESTINATION` to `$KAMAL_OUTPUT`, Kamal reconfigures with the new destination before proceeding. This is useful for dynamic destination assignment — for example, claiming an available beta slot:

```bash
#!/bin/bash
SLOT=$(claim-beta-slot)  # .kamal/bin is on PATH during hooks
echo "KAMAL_DESTINATION=${SLOT}" >> "$KAMAL_OUTPUT"
echo "KAMAL_MESSAGE=Deploying to ${SLOT}" >> "$KAMAL_OUTPUT"
```

The `claim-beta-slot` script can live in `.kamal/bin/` — it will be on `$PATH` automatically during hook execution (see [Hook PATH](/docs/hooks/overview/#hook-path)).

Running `kamal deploy -d beta` with the hook above would reconfigure the deploy to use the claimed slot (e.g., `deploy.beta2.yml`) instead of `deploy.beta.yml`.

### Injecting a destination

The hook can also inject a destination when none was provided on the command line. This works with [`require_destination`](/docs/configuration/overview/#require-destinations) — the hook supplies the destination before the requirement is checked.

### Skipping

Like all hooks, `pre-configure` is skipped when `--skip-hooks` is passed. It also does not fire for commands that don't load configuration (e.g., `kamal version`).
