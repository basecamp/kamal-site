---
title: Search Results
nav: false
search: false
---

<h1 id="search-query">Search results for <mark></mark></h1>

<div id="search-results"></div>

<script>
  window.store = {
{% assign pages = site.pages | where: 'search', true %}
{% for page in pages %}
  {% if page.path contains 'docs/' %}
    {% unless page.path contains 'v1/' %}
      "{{ page.url | slugify }}": {
        "title": "{{ page.title | smartify | xml_escape }}",
        "content": {{ page.content | markdownify | strip_html | strip_newlines | jsonify }},
        "section": "{{ page.url }}".split("/").filter(element => element !== "").slice(1).join("/"),
        "url": "{{ page.url | xml_escape }}"
      }{% unless forloop.last %},{% endunless %}
    {% endunless %}
  {% endif %}
{% endfor %}
  };
</script>
