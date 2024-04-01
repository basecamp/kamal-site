---
title: Asset bridging
---

# Asset bridging

If there are changes to CSS or JS files, we may get requests for the old versions on the new container and vice-versa.

To avoid 404s we can specify an asset path. Kamal will replace that path in the container with a mapped volume containing both sets of files. This requires that file names change when the contents change (e.g. by including a hash of the contents in the name).

To configure this, set the path to the assets:

```yaml
asset_path: /rails/public/assets
```
