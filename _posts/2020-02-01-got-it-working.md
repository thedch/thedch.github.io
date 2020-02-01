---
layout:     post
title:      Consciously deciding not to care
---

Alright! Finally happy with my jekyll setup. Switched around a bunch, tried Hugo and Ablog (as well as GitLab pages) -- turns out Jekyll has a lot of annoying bits but is the least annoying of them all.

For some reason, making new posts in jekyll really annoys me. Having to write out the date in the title and set up the front matter boilerplate. Why does this annoy me? It takes 30-60 seconds per post, and considering how little I write, maybe 10 mins of my entire life? And yet, I've spent (too many) hours researching other static site generators and hosting platforms for this tiny, tiny, tiny blog.

Of course, this can totally be fixed with a trivial bash script:

```
#!/bin/bash

if [[ "$#" -ne 1 ]]; then
    echo "Usage: ./newpost.sh NEW_TITLE_HERE"
    exit 2
fi

fname=_posts/$(date +"%Y-%m-%d")-$1.md

cat > $fname<< EOF
---
layout:     post
title:      $1
---
EOF

echo "Just created new post at $fname!"
subl $fname # or vim etc, prefer writing prose in subl
```

The real lesson is that choice of backend, hosting platform, etc doesn't matter at all. Just get something super simple set up, and use it to write your thoughts. If things annoy you, stop finding them annoying and move on with your life.

One of my biggest lessons from Q42019 was how crucial it is to consciously place things "under your radar" so to speak. Notice code that needs refactor but works? If you have something more important to do, place it under your radar. Focusing on small things / the wrong things is a pretty common junior thing, and I need to break that habit.

The above example is an easy one -- problem -> easy quick bash script -> solved. Throughout my life, there will be real annoyances I can't get away from. Stuff I dislike, find frustrating, but would be a waste of time to fix. I just have to decide that's okay, and focus on important things.

Knowing your have a problem is half the battle (is it?) -- so hopefully I can continue into 2020 worrying less about things that don't matter.
