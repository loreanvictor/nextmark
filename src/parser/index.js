import unified from 'unified'
import markdown from 'remark-parse'

import { pack } from './pack'
import { lift } from './lift'
import { expand } from './expand'


export const parser =
  unified()
    .use(markdown)
    // .use(lift)
    // .use(expand(code => parser.run(parser.parse(code))))
    // .use(pack)
