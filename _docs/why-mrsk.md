---
title: Why MRSK?
order: 4
---

## Why not just run Capistrano, Kubernetes or Docker Swarm?

MRSK basically is Capistrano for Containers, without the need to carefully prepare servers in advance. No need to ensure that the servers have just the right version of Ruby or other dependencies you need. That all lives in the Docker image now. You can boot a brand new Ubuntu (or whatever) server, add it to the list of servers in MRSK, and it'll be auto-provisioned with Docker, and run right away. Docker's layer caching also speeds up deployments with less mucking about on the server. And the images built for MRSK can be used for CI or later introspection.

Kubernetes is a beast. Running it yourself on your own hardware is not for the faint of heart. It's a fine option if you want to run on someone else's platform, either transparently [like Render](https://thenewstack.io/render-cloud-deployment-with-less-engineering/) or explicitly on AWS/GCP, but if you'd like the freedom to move between cloud and your own hardware, or even mix the two, MRSK is much simpler. You can see everything that's going on, it's just basic Docker commands being called.

Docker Swarm is much simpler than Kubernetes, but it's still built on the same declarative model that uses state reconciliation. MRSK is intentionally designed around imperative commands, like Capistrano.

Ultimately, there are a myriad of ways to deploy web apps, but this is the toolkit we're using at [37signals](https://37signals.com) to bring [HEY](https://www.hey.com) [home from the cloud](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) without losing the advantages of modern containerization tooling.
