import { parser } from './parser'

const code = `
Hellow **World**
<Component x="hellow">
Hi
<X hellow=2/>

<Child>

Stuffs

</Child>

</Component>
`

const parsed = parser.parse(code)
parser.run(parsed)

console.log(parsed.children[1])
