import visit from 'unist-util-visit'

import { HTMLOpenTag, HTMLCloseTag, HTMLSelfClosingTag } from './regex'


/**
 *
 * Packs trees like
 * ```
 * ['<div>', '# hellow', '</div>']
 * ```
 * into trees like
 * ```
 * [{ tag: 'div', children: ['# hellow'] }]
 * ```
 *
 */
export function pack() {
  return tree => {
    visit(tree, node => {
      if (node.children) {
        const children = []
        let sink

        node.children.forEach(child => {
          if (!sink) {
            if (child.type === 'html') {
              const selfclosing = HTMLSelfClosingTag.exec(child.value)
              const open = HTMLOpenTag.exec(child.value)
              if (selfclosing) {
                children.push({
                  type: 'component',
                  tag: selfclosing.groups.tag,
                  attrs: selfclosing.groups.atts,
                  children: [],
                  position: child.position
                })
              } else if (open) {
                sink = {
                  open: child,
                  tag: open.groups.tag,
                  attrs: open.groups.attrs,
                  children: []
                }
              } else {
                children.push(child)
              }
            } else {
              children.push(child)
            }
          } else {
            const close = HTMLCloseTag.exec(child.value)
            if (close && close.groups.tag === sink.tag) {
              children.push({
                type: 'component',
                tag: sink.tag,
                attrs: sink.attrs,
                children: sink.children,
                position: {
                  start: sink.open.position.start,
                  end: child.position.end,
                }
              })

              sink = undefined
            } else {
              sink.children.push(child)
            }
          }
        })

        if (sink) {
          //
          // NOTE: this means unclosed HTML tags will get omitted.
          // TODO: is this the desired behavior?
          //
          sink.children.forEach(child => children.push(child))
        }

        node.children = children
      }
    })
  }
}
