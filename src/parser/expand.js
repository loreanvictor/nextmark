import visit from 'unist-util-visit'

import { HTMLTag } from './regex'


function split(node, file) {
  let pre = ''
  let match
  let target = node.value

  const start = node.postion.start.offset

  // eslint-disable-next-line no-cond-assign
  while (match = HTMLTag.exec(target)) {
    if (!match.groups.pre.length && !match.groups.post.length) {
      break
    }
  }
}


export function expand(reparse) {
  return () => async (tree, file) => {
    const nodes = []

    visit(tree, node => {
      if (node.children && node.children.some(n => n.type === 'html')) {
        nodes.push(node)
      }
    })

    for (const node of nodes) {
      const children = []

      for (const child of node.children) {
        if (child.type === 'html') {
          // TODO:
          children.push(child)
        } else {
          children.push(child)
        }
      }

      node.children = children
    }
  }
}
