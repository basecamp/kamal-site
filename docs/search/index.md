---
layout: docs
title: Search Results
---

<p id="search-query"></p>

<ul id="search-results"></ul>

<script>
  {% assign docs = site.data.docs %}

  window.store = {
    {% for page in site.pages %}
      "{{ page.url | slugify }}": {
        "title": "{{ page.title | xml_escape }}",
        "content": {{ page.content | strip_html | strip_newlines | jsonify }},
        "section": "{{ page.url }}".split("/").filter(element => element !== "").slice(1).join("/"),
        "url": "{{ page.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>

<script src="/assets/js/search/lunr.min.js"></script>
<script src="/assets/js/search/script.js"></script>