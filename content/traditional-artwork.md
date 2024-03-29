---
title: Traditional Artwork
category: Artwork
order: 10
author: Richard Sabbarton
---

Placeholder for my traditional artwork

{% for art in site.artwork %}
{% include artwork-preview.html title={ art.title } description={ art.description } file={ art.file } type={ art.type } media={ art.media } author={ art.author } %}
{% endfor %}
