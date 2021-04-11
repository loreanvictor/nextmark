import { ref } from 'render-jsx/common'
import { subscribe, pipe, filter } from 'callbag-common'


function escape(code, emptyfix = false) {
  if (emptyfix && code.length === 0) {
    return '&nbsp;'
  }

  return code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function Editor({ highlight, code }, renderer) {
  const editor = ref()

  const clearHl = () => {
    if (editor.resolved) {
      editor.$.innerHTML = editor.$.innerHTML.replaceAll('<hl>', '').replaceAll('</hl>', '')
    }
  }

  const applyHl = (line, start, end) => {
    if (!line) { return }

    if (end === -1) {
      end = line.textContent.length
    }

    const leading = line.textContent.substring(0, start)
    const marked = line.textContent.substring(start, end)
    const trailing = line.textContent.substring(end, line.textContent.length)

    const modified = escape(leading) + '<hl>' + escape(marked, true) + '</hl>' + escape(trailing)

    if (line.nodeType === line.TEXT_NODE) {
      renderer.render(<div _content={modified}/>).before(line)
      renderer.remove(line)
    } else {
      line.innerHTML = modified
    }
  }

  const extractCode = () => {
    code.set(
      Array
        .from(editor.$.childNodes)
        .reduce((aggr, child) => aggr + (child.textContent || '') + '\n', '')
    )
  }

  this.track(
    pipe(
      highlight,
      filter(() => editor.resolved),
      subscribe(_hl => {
        clearHl()
        if (_hl) {
          const lines = Array.from(editor.$.childNodes)
          if (lines.length === 0) {
            return
          }

          const endLine = _hl.end.line - 1
          const startLine = _hl.start.line - 1
          const endCol = _hl.end.column - 1
          const startCol = _hl.start.column - 1

          if (endLine === startLine) {
            applyHl(lines[endLine], startCol, endCol)
          } else {
            for (let i = startLine; i <= endLine; i++) {
              if (i === startLine) {
                applyHl(lines[i], startCol, -1)
              } else if (i === endLine) {
                applyHl(lines[i], 0, endCol)
              } else {
                applyHl(lines[i], 0, -1)
              }
            }
          }
        }
      })
    )
  )

  return <div _ref={editor} contenteditable
    onmouseenter={clearHl}
    oninput={extractCode}
  />
}
