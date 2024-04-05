---
title: Accessory
---

# kamal accessory

Accessories are long-lived services that your app depends on. They are not updated when you deploy.

They are not proxied, so rebooting will have a small period of downtime. You can map volumes from the host server into your container for persistance across reboots.

Run `kamal accessory` to view and manage your accessories.

```
$ kamal accessory
Commands:
  kamal accessory boot [NAME]        # Boot new accessory service on host (use NAME=all to boot all accessories)
  kamal accessory details [NAME]     # Show details about accessory on host (use NAME=all to show all accessories)
  kamal accessory exec [NAME] [CMD]  # Execute a custom command on servers (use --help to show options)
  kamal accessory help [COMMAND]     # Describe subcommands or one specific subcommand
  kamal accessory logs [NAME]        # Show log lines from accessory on host (use --help to show options)
  kamal accessory reboot [NAME]      # Reboot existing accessory on host (stop container, remove container, start new container; use NAME=all to boot all accessories)
  kamal accessory remove [NAME]      # Remove accessory container, image and data directory from host (use NAME=all to remove all accessories)
  kamal accessory restart [NAME]     # Restart existing accessory container on host
  kamal accessory start [NAME]       # Start existing accessory container on host
  kamal accessory stop [NAME]        # Stop existing accessory container on host
```

To update an accessory, update the image in your config and run `kamal accessory reboot [NAME]`.

Example:

```
$ kamal accessory boot all
Running the pre-connect hook...
  INFO [bd04b11b] Running /usr/bin/env .kamal/hooks/pre-connect on localhost
  INFO [bd04b11b] Finished in 0.003 seconds with exit status 0 (successful).
  INFO [681a028b] Running /usr/bin/env mkdir -p .kamal on server2
  INFO [e3495d1d] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [e7c5c159] Running /usr/bin/env mkdir -p .kamal on server3
  INFO [e3495d1d] Finished in 0.170 seconds with exit status 0 (successful).
  INFO [681a028b] Finished in 0.182 seconds with exit status 0 (successful).
  INFO [e7c5c159] Finished in 0.185 seconds with exit status 0 (successful).
  INFO [83153af3] Running /usr/bin/env mkdir -p .kamal/locks on server1
  INFO [83153af3] Finished in 0.028 seconds with exit status 0 (successful).
Acquiring the deploy lock...
  INFO [416a654c] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on server1
  INFO [3fb56559] Running docker login registry:4443 -u [REDACTED] -p [REDACTED] on server2
  INFO [3fb56559] Finished in 0.065 seconds with exit status 0 (successful).
  INFO [416a654c] Finished in 0.080 seconds with exit status 0 (successful).
  INFO [2705083f] Running docker run --name custom-busybox --detach --restart unless-stopped --log-opt max-size="10m" --env-file .kamal/env/accessories/custom-busybox.env --label service="custom-busybox" registry:4443/busybox:1.36.0 sh -c 'echo "Starting busybox..."; trap exit term; while true; do sleep 1; done' on server2
  INFO [3cb3adb6] Running docker run --name custom-busybox --detach --restart unless-stopped --log-opt max-size="10m" --env-file .kamal/env/accessories/custom-busybox.env --label service="custom-busybox" registry:4443/busybox:1.36.0 sh -c 'echo "Starting busybox..."; trap exit term; while true; do sleep 1; done' on server1
  INFO [3cb3adb6] Finished in 0.552 seconds with exit status 0 (successful).
  INFO [2705083f] Finished in 0.566 seconds with exit status 0 (successful).
Releasing the deploy lock...
```
