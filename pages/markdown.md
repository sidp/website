---
title: I'm a markdown file!
---

Markdown is pretty cool if you ask me. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquid sapiente, assumenda cupiditate dicta ipsa repudiandae sequi nobis consectetur nisi vitae officia dolore ipsum obcaecati laboriosam officiis, cumque, temporibus totam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptatibus voluptas asperiores ab nostrum eaque non distinctio, mollitia provident, consequatur nesciunt aliquam consequuntur. Error, veniam tenetur fugit aut quae quis!

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nemo magni amet error eaque quo, quaerat. Expedita vero dolores accusantium quod nobis magni, repellat eaque distinctio ipsa velit aliquam illo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima voluptas laborum commodi, doloribus voluptatibus tempore provident cum soluta ab eligendi. Tempora dolore aut rem, ab iste fuga sunt vel error. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo rem molestiae at minus quasi placeat laborum fugit aspernatur voluptate voluptatibus a sed dolorum eum magni aliquid est repellendus optio, facere.

## You can have lists

### Numbered
1. me first!
2. I'm second!
3. third :(

### Unordered
* Cheese
* is actually
* really good

And **lots** of other *fun* stuff.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

## Enable additional syntax with Markdown-it plugins

You can add additional Markdown-it plugins with
[a custom markdown loader](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/loaders/markdown-loader/index.js#L22-L32).

### Subscript
H~2~0

### Footnote
Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]

### Definition lists
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

### Abbreviation
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.

### Add a class or other attributes to content.
here be dragons {.warning}

## Some code

Javascript
```javascript
function $initHighlight(block, flags) {
  try {
    if (block.className.search(/\bno\-highlight\b/) != -1)
      return processBlock(block, true, 0x0F) + ' class=""';
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) { // "0 / 2" should not be parsed as regexp
    if (checkCondition(classes[i]) === undefined)
      return /\d+/g;
  }
}
```

Python
```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```
