---
title: Overview
order: 1
---

# Overview

MRSK deploys web apps anywhere from bare metal to cloud VMs using Docker with zero downtime. It uses the dynamic reverse-proxy Traefik to hold requests while the new application container is started and the old one is stopped. It works seamlessly across multiple hosts, using SSHKit to execute commands. It was built for Rails applications, but works with any type of web app that can be containerized with Docker.
