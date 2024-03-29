---
title: Traditional Artwork
category: Artwork
order: 10
author: Richard Sabbarton
---

Placeholder for my traditional artwork

    {% for art in site.artwork %}
        <div class="contentlinks"><a class="contentlinks" href="{{ art.file | absolute_url }}">{{ art.title }}</a></div>
        {{ art.description }}
        {{ art.media }}
        {{ art.author }}
    {% endfor %}
