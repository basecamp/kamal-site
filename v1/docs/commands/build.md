---
title: Build
---

# kamal build

Build your app images and push them to your servers. These commands are called indirectly by `kamal deploy` and `kamal redeploy`.

By default, Kamal will only build files you have committed to your Git repository. However, you can configure Kamal to use the current context (instead of a Git archive of HEAD) by setting the [build context](https://kamal-deploy.org/docs/configuration/builders/#build-context).

```bash
$ kamal build
Commands:
  kamal build create          # Create a build setup
  kamal build deliver         # Build app and push app image to registry then pull image on servers
  kamal build details         # Show build setup
  kamal build help [COMMAND]  # Describe subcommands or one specific subcommand
  kamal build pull            # Pull app image from registry onto servers
  kamal build push            # Build and push app image to registry
  kamal build remove          # Remove build setup
```

Examples:

```
$ kamal build push
Running the pre-connect hook...
  INFO [92ebc200] Running /usr/bin/env .kamal/hooks/pre-connect on localhost
  INFO [92ebc200] Finished in 0.004 seconds with exit status 0 (successful).
  INFO [cbbad07e] Running /usr/bin/env mkdir -p .kamal on server1
  INFO [e6ac30e7] Running /usr/bin/env mkdir -p .kamal on server3
  INFO [a1adae3a] Running /usr/bin/env mkdir -p .kamal on server2
  INFO [cbbad07e] Finished in 0.145 seconds with exit status 0 (successful).
  INFO [a1adae3a] Finished in 0.179 seconds with exit status 0 (successful).
  INFO [e6ac30e7] Finished in 0.182 seconds with exit status 0 (successful).
  INFO [c6242009] Running /usr/bin/env mkdir -p .kamal/locks on server1
  INFO [c6242009] Finished in 0.009 seconds with exit status 0 (successful).
Acquiring the deploy lock...
  INFO [427ae9bc] Running docker --version on localhost
  INFO [427ae9bc] Finished in 0.039 seconds with exit status 0 (successful).
Running the pre-build hook...
  INFO [2f120630] Running /usr/bin/env .kamal/hooks/pre-build on localhost
  INFO [2f120630] Finished in 0.004 seconds with exit status 0 (successful).
  INFO [ad386911] Running /usr/bin/env git archive --format=tar HEAD | docker build -t registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac -t registry:4443/app:latest --label service="app" --build-arg [REDACTED] --file Dockerfile - && docker push registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac && docker push registry:4443/app:latest on localhost
 DEBUG [ad386911] Command: /usr/bin/env git archive --format=tar HEAD | docker build -t registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac -t registry:4443/app:latest --label service="app" --build-arg [REDACTED] --file Dockerfile - && docker push registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac && docker push registry:4443/app:latest
 DEBUG [ad386911] 	#0 building with "default" instance using docker driver
 DEBUG [ad386911]
 DEBUG [ad386911] 	#1 [internal] load remote build context
 DEBUG [ad386911] 	#1 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#2 copy /context /
 DEBUG [ad386911] 	#2 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#3 [internal] load metadata for registry:4443/nginx:1-alpine-slim
 DEBUG [ad386911] 	#3 DONE 0.0s
 DEBUG [ad386911]
 DEBUG [ad386911] 	#4 [1/5] FROM registry:4443/nginx:1-alpine-slim@sha256:558cdef0693faaa02c0b81c21b5d6f4b4fe24e3ac747581f3e6e8f5c4032db58
 DEBUG [ad386911] 	#4 DONE 0.0s
 DEBUG [ad386911]
 DEBUG [ad386911] 	#5 [4/5] RUN mkdir -p /usr/share/nginx/html/versions && echo "version" > /usr/share/nginx/html/versions/75bf6fa40b975cbd8aec05abf7164e0982f185ac
 DEBUG [ad386911] 	#5 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#6 [2/5] COPY default.conf /etc/nginx/conf.d/default.conf
 DEBUG [ad386911] 	#6 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#7 [3/5] RUN echo 75bf6fa40b975cbd8aec05abf7164e0982f185ac > /usr/share/nginx/html/version
 DEBUG [ad386911] 	#7 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#8 [5/5] RUN mkdir -p /usr/share/nginx/html/versions && echo "hidden" > /usr/share/nginx/html/versions/.hidden
 DEBUG [ad386911] 	#8 CACHED
 DEBUG [ad386911]
 DEBUG [ad386911] 	#9 exporting to image
 DEBUG [ad386911] 	#9 exporting layers done
 DEBUG [ad386911] 	#9 writing image sha256:ed9205d697e5f9f735e84e341a19a3d379b9b4a8dc5d04b6219bda29e6126489 done
 DEBUG [ad386911] 	#9 naming to registry:4443/app:75bf6fa40b975cbd8aec05abf7164e0982f185ac done
 DEBUG [ad386911] 	#9 naming to registry:4443/app:latest done
 DEBUG [ad386911] 	#9 DONE 0.0s
 DEBUG [ad386911] 	The push refers to repository [registry:4443/app]
 DEBUG [ad386911] 	7e49189613ab: Preparing
 DEBUG [ad386911] 	054c18a8e0a6: Preparing
 DEBUG [ad386911] 	1552c04abfaa: Preparing
 DEBUG [ad386911] 	36f2f66132ea: Preparing
 DEBUG [ad386911] 	d5e2fb5f3301: Preparing
 DEBUG [ad386911] 	8fde05710e93: Preparing
 DEBUG [ad386911] 	fdf572380e92: Preparing
 DEBUG [ad386911] 	a031a04401d0: Preparing
 DEBUG [ad386911] 	ecb78d985cad: Preparing
 DEBUG [ad386911] 	3e0e830ccd77: Preparing
 DEBUG [ad386911] 	7c504f21be85: Preparing
 DEBUG [ad386911] 	fdf572380e92: Waiting
 DEBUG [ad386911] 	a031a04401d0: Waiting
 DEBUG [ad386911] 	ecb78d985cad: Waiting
 DEBUG [ad386911] 	3e0e830ccd77: Waiting
 DEBUG [ad386911] 	7c504f21be85: Waiting
 DEBUG [ad386911] 	8fde05710e93: Waiting
 DEBUG [ad386911] 	054c18a8e0a6: Layer already exists
 DEBUG [ad386911] 	7e49189613ab: Layer already exists
 DEBUG [ad386911] 	36f2f66132ea: Layer already exists
 DEBUG [ad386911] 	d5e2fb5f3301: Layer already exists
 DEBUG [ad386911] 	1552c04abfaa: Layer already exists
 DEBUG [ad386911] 	8fde05710e93: Layer already exists
 DEBUG [ad386911] 	fdf572380e92: Layer already exists
 DEBUG [ad386911] 	a031a04401d0: Layer already exists
 DEBUG [ad386911] 	3e0e830ccd77: Layer already exists
 DEBUG [ad386911] 	ecb78d985cad: Layer already exists
 DEBUG [ad386911] 	7c504f21be85: Layer already exists
 DEBUG [ad386911] 	75bf6fa40b975cbd8aec05abf7164e0982f185ac: digest: sha256:68e534dab98fc7c65c8e2353f6414e9c6c812481deea8d57ae6b0b0140ec40d5 size: 2604
 DEBUG [ad386911] 	The push refers to repository [registry:4443/app]
 DEBUG [ad386911] 	7e49189613ab: Preparing
 DEBUG [ad386911] 	054c18a8e0a6: Preparing
 DEBUG [ad386911] 	1552c04abfaa: Preparing
 DEBUG [ad386911] 	36f2f66132ea: Preparing
 DEBUG [ad386911] 	d5e2fb5f3301: Preparing
 DEBUG [ad386911] 	8fde05710e93: Preparing
 DEBUG [ad386911] 	fdf572380e92: Preparing
 DEBUG [ad386911] 	a031a04401d0: Preparing
 DEBUG [ad386911] 	ecb78d985cad: Preparing
 DEBUG [ad386911] 	3e0e830ccd77: Preparing
 DEBUG [ad386911] 	7c504f21be85: Preparing
 DEBUG [ad386911] 	fdf572380e92: Waiting
 DEBUG [ad386911] 	a031a04401d0: Waiting
 DEBUG [ad386911] 	ecb78d985cad: Waiting
 DEBUG [ad386911] 	3e0e830ccd77: Waiting
 DEBUG [ad386911] 	7c504f21be85: Waiting
 DEBUG [ad386911] 	8fde05710e93: Waiting
 DEBUG [ad386911] 	36f2f66132ea: Layer already exists
 DEBUG [ad386911] 	7e49189613ab: Layer already exists
 DEBUG [ad386911] 	054c18a8e0a6: Layer already exists
 DEBUG [ad386911] 	1552c04abfaa: Layer already exists
 DEBUG [ad386911] 	d5e2fb5f3301: Layer already exists
 DEBUG [ad386911] 	8fde05710e93: Layer already exists
 DEBUG [ad386911] 	fdf572380e92: Layer already exists
 DEBUG [ad386911] 	a031a04401d0: Layer already exists
 DEBUG [ad386911] 	ecb78d985cad: Layer already exists
 DEBUG [ad386911] 	3e0e830ccd77: Layer already exists
 DEBUG [ad386911] 	7c504f21be85: Layer already exists
 DEBUG [ad386911] 	latest: digest: sha256:68e534dab98fc7c65c8e2353f6414e9c6c812481deea8d57ae6b0b0140ec40d5 size: 2604
  INFO [ad386911] Finished in 0.502 seconds with exit status 0 (successful).
Releasing the deploy lock...
```
