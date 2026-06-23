---
title: pre-connect
---

# Hooks: pre-connect

Runs before taking the deploy lock. For anything that needs to run before connecting to remote hosts, e.g., DNS warming, checking if you are on the VPN.

This hook runs before Kamal connects to your servers, which happens for nearly every command — including `kamal app exec`.

**Warning:** Do not run a `kamal` command from a `pre-connect` hook. Because `pre-connect` fires before connecting, the nested `kamal` command will trigger `pre-connect` again, which runs the hook again, and so on — resulting in infinite recursion.

If you must invoke `kamal` from this hook (for example, to read secrets or check state), guard the script against re-entrancy. A simple approach is to set an environment marker and short-circuit when it is already present:

```bash
#!/bin/sh

# Avoid infinite recursion: pre-connect runs before nearly every kamal command,
# so calling kamal here would re-trigger this hook.
if [ -n "$KAMAL_IN_PRE_CONNECT" ]; then
  exit 0
fi
export KAMAL_IN_PRE_CONNECT=1

# ... your logic that may call kamal ...
```

Alternatively, pass `--skip-hooks` to any nested `kamal` invocation so it does not run the hook again.
