---
title: Checking and setting the lock
---

# Checking and setting the lock

Commands that are unsafe to run concurrently will take a deploy lock while they run. The lock is the `kamal_lock` directory on the primary server.

You can check the lock status with:

```
kamal lock status

Locked by: AN Other at 2023-03-24 09:49:03 UTC
Version: 77f45c0686811c68989d6576748475a60bf53fc2
Message: Automatic deploy lock
```

You can also manually acquire and release the lock:

```
kamal lock acquire -m "Doing maintanence"
```

```
kamal lock release
```
