---
title: Search Results
nav: false
---

<h1 id="search-query">Search results for <mark></mark></h1>

<div id="search-results"></div>

<script>
  {% assign docs = site.data.docs %}

  window.store = {
    {% for page in site.pages %}
      "{{ page.url | slugify }}": {
        "title": "{{ page.title | smartify | xml_escape }}",
        "content": {{ page.content | markdownify | strip_html | strip_newlines | jsonify }},
        "section": "{{ page.url }}".split("/").filter(element => element !== "").slice(1).join("/"),
        "url": "{{ page.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
