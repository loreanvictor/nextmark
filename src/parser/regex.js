export const HTMLOpenTag = /^<(?<tag>[a-zA-Z][^\s]*)(?<attrs>(?:\s+[^\s|>]+)*)>$/
export const HTMLSelfClosingTag = /^<(?<tag>[a-zA-Z][^\s|>|/]*)(?<attrs>(?:\s+[^\s|>]+)*)\/>/
export const HTMLCloseTag = /^<\/(?<tag>[a-zA-Z][^\s|>|/]*)>$/
