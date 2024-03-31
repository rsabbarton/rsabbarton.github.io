---
title: Digital Artwork
category: Artwork
order: 20
author: Richard Sabbarton
---

{% assign tradart = site.artwork | where:"type","digital" | sort: "rank", "first" | reverse %}
{% for art in tradart %}
{% include artwork-preview.html title=art.title description=art.description file=art.file page=art.page type=art.type media=art.media author=art.author %}
{% endfor %}
