---
title: Configuring the run directory
---

# Configuring the run directory

Kamal needs to create files on the host for locking and audit logs.

By default these will be created in the `.kamal` subdirectory of the default SSH directory.

This can be changed with

```yaml
run_directory: /var/run/kamal
```
