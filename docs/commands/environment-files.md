---
title: Environment files
---

# Environment files

Before you can deploy, you'll need to push env files to the servers. They will then be included in the docker run commands.

You can do this by running:

```bash
kamal env push
```

If you create the files with `kamal envify`, they will automatically be pushed for you.
