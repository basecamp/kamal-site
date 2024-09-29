---
title: Booting
---

# Booting

When deploying to large numbers of hosts, you might prefer not to restart your services on every host at the same time.

Kamal’s default is to boot new containers on all hosts in parallel. However, you can control this with the boot configuration.

## [Fixed group sizes](#fixed-group-sizes)

Here, we boot 2 hosts at a time with a 10-second gap between each group:

```yaml
boot:
  limit: 2
  wait: 10
```

## [Percentage of hosts](#percentage-of-hosts)

Here, we boot 25% of the hosts at a time with a 2-second gap between each group:

```yaml
boot:
  limit: 25%
  wait: 2
```
