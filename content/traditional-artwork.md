---
title: Traditional Artwork
category: Artwork
order: 10
author: Richard Sabbarton
---

Placeholder for my traditional artwork

{% assign tradart = site.artwork | where:"type","traditional" | sort: "rank", "first" | reverse %}
{% for art in tradart %}
{% include artwork-preview.html title=art.title description=art.description file=art.file type=art.type media=art.media author=art.author %}
{% endfor %}
