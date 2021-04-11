import unified from 'unified'
import markdown from 'remark-parse'

import { pack } from './pack'
import { lift } from './lift'


export const parser =
  unified()
    .use(markdown)
    .use(lift)
    .use(pack)
