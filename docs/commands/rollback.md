---
title: kamal rollback
---

# kamal rollback

You can rollback a deployment with `kamal rollback`

If you've discovered a bad deploy, you can quickly rollback to a previous image. You can see what old containers are available for rollback by running `kamal app containers -q`. It'll give you a presentation similar to `kamal app details`, but include all the old containers as well.

```
App Host: 192.168.0.1
CONTAINER ID   IMAGE                                                                         COMMAND                    CREATED          STATUS                      PORTS      NAMES
1d3c91ed1f51   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e..."   19 minutes ago   Up 19 minutes               3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123
539f26b28369   registry.digitalocean.com/user/app:e5d9d7c2b898289dfbc5f7f1334140d984eedae4   "/rails/bin/docker-e..."   31 minutes ago   Exited (1) 27 minutes ago              chat-e5d9d7c2b898289dfbc5f7f1334140d984eedae4

App Host: 192.168.0.2
CONTAINER ID   IMAGE                                                                         COMMAND                    CREATED          STATUS                      PORTS      NAMES
badb1aa51db4   registry.digitalocean.com/user/app:6ef8a6a84c525b123c5245345a8483f86d05a123   "/rails/bin/docker-e..."   19 minutes ago   Up 19 minutes               3000/tcp   chat-6ef8a6a84c525b123c5245345a8483f86d05a123
6f170d1172ae   registry.digitalocean.com/user/app:e5d9d7c2b898289dfbc5f7f1334140d984eedae4   "/rails/bin/docker-e..."   31 minutes ago   Exited (1) 27 minutes ago              chat-e5d9d7c2b898289dfbc5f7f1334140d984eedae4
```

From the example above, we can see that `e5d9d7c2b898289dfbc5f7f1334140d984eedae4` was the last version, so it's available as a rollback target. We can perform this rollback by running `kamal rollback e5d9d7c2b898289dfbc5f7f1334140d984eedae4`.

That'll stop `6ef8a6a84c525b123c5245345a8483f86d05a123` and then start a new container running the same image as `e5d9d7c2b898289dfbc5f7f1334140d984eedae4`. Nothing to download from the registry.

**Note:** By default old containers are pruned after 3 days when you run `kamal deploy`.
