import visit from 'unist-util-visit'


function wrap(sink) {
  return {
    type: 'paragraph',
    children: sink,
    position: {
      start: sink[0].position.start,
      end: sink[sink.length - 1].position.end,
    }
  }
}

/**
 *
 * Lifts html elements outside of paragraphs.
 *
 */
export function lift() {
  return tree => {
    visit(tree, node => {
      if (node.children) {
        const children = []

        node.children.forEach(child => {
          if (
            child.type === 'paragraph'
            && child.children
            && child.children.some(grandchild => grandchild.type === 'html')
          ) {
            let sink

            child.children.forEach(grandchild => {
              if (grandchild.type === 'html') {
                if (sink) {
                  children.push(wrap(sink))
                  sink = undefined
                }

                children.push(grandchild)
              } else {
                if (!sink) {
                  sink = []
                }

                sink.push(grandchild)
              }
            })

            if (sink) {
              children.push(wrap(sink))
            }
          } else {
            children.push(child)
          }
        })

        node.children = children
      }
    })
  }
}
