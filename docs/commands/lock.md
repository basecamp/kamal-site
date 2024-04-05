---
title: Lock
---

# kamal lock

Manage deployment locks.

Commands that are unsafe to run concurrently will take a deploy lock while they run. The lock is the `kamal_lock` directory on the primary server.

You can manage them directly - for example clearing a leftover lock from a failed command or preventing deployments during a maintanence window.

```
$ kamal lock
Commands:
  kamal lock acquire -m, --message=MESSAGE  # Acquire the deploy lock
  kamal lock help [COMMAND]                 # Describe subcommands or one specific subcommand
  kamal lock release                        # Release the deploy lock
  kamal lock status                         # Report lock status
```

Example:

```bash
$ kamal lock status
  INFO [f085f083] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [f085f083] Finished in 0.146 seconds with exit status 0 (successful).
There is no deploy lock
$ kamal lock acquire -m "Maintanence in progress"
  INFO [d9f63437] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [d9f63437] Finished in 0.138 seconds with exit status 0 (successful).
Acquired the deploy lock
$ kamal lock status
  INFO [9315755d] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [9315755d] Finished in 0.130 seconds with exit status 0 (successful).
Locked by: Deployer at 2024-04-05T08:32:46Z
Version: 75bf6fa40b975cbd8aec05abf7164e0982f185ac
Message: Maintanence in progress
$ kamal lock release
  INFO [7d5718a8] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [7d5718a8] Finished in 0.137 seconds with exit status 0 (successful).
Released the deploy lock
$ kamal lock status
  INFO [f5900cc8] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [f5900cc8] Finished in 0.132 seconds with exit status 0 (successful).
There is no deploy lock
```
