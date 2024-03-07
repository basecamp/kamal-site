---
title: Using shell expansion
---

# Using shell expansion

You can use shell expansion to interpolate values from the host machine into labels with the `${}` syntax. Anything within the curly braces will be executed on the host machine and the result will be interpolated into the label.

```yaml
labels:
  host-machine: "${cat /etc/hostname}"
```

**Note:** Any other occurrence of `$` will be escaped to prevent unwanted shell expansion!
