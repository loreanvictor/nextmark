import './index.css'

import state from 'callbag-state'
import { pipe, map, tap, subscribe } from 'callbag-common'
import { makeRenderer } from 'callbag-jsx'

import { Node } from './node'
import { Editor } from './editor'

import { parser } from '../src/parser'


const renderer = makeRenderer()

const code = state('')
const highlight = state(undefined)
const tree = state({})

pipe(
  code,
  map(_code => parser.parse(_code)),
  tap(parsed => parser.run(parsed)),
  subscribe(node => tree.set(node)),
)

renderer.render(
  <div class='container'>
    <div class='left'>
      <Editor code={code} highlight={highlight}/>
    </div>
    <div class='right'>
      <Node node={tree} highlight={highlight}/>
    </div>
  </div>
).on(document.body)
