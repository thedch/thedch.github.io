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
