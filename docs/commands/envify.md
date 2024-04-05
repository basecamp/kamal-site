---
title: Envify
---

# kamal envify

Creates `.env` by evaluating `.env.erb` (or `.env.staging.erb` -> `.env.staging` when using -d staging) and push env files to the servers containing
runtime secrets.

You can use this to manage secrets externally from your repository. `.env` is used for both build and runtime secrets.

If you want to manage the `.env` file yourself, you can instead push the runtime secrets with `kamal env push` (see [kamal env](../env)).
