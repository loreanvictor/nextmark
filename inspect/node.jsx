import { List, Conditional } from 'callbag-jsx'
import { pipe, map, expr } from 'callbag-common'
import { state } from 'callbag-state'


export function Node({node, highlight}, renderer) {
  const expanded = state(false)

  const expandmark = expr($ =>
    ($(node).children && $(node).children.length > 0)
      ? ( $(expanded) ? 'ᐁ  ' : 'ᐅ  ')
      : ''
  )

  const type = pipe(node, map(n => n.type))
  const children = pipe(node, map(n => n.children))


  return <div class='node'>
    <span class='title'
      onclick={() => expanded.set(!expanded.get())}
      onmouseenter={() => highlight.set(node.get().position)}
    >
      <i>{expandmark}</i>{type}
    </span>
    <Conditional if={expanded}
      then={() => <div class='children'>
        <List of={children}
          each={child => <Node node={child} highlight={highlight}/>}/>
      </div>}/>
  </div>
}
