export const HTMLOpenTag = /^<(?<tag>[a-zA-Z][^\s]*)(?<attrs>(?:\s+[^\s|>]+)*)>$/
export const HTMLSelfClosingTag = /^<(?<tag>[a-zA-Z][^\s|>|/]*)(?<attrs>(?:\s+[^\s|>]+)*)\/>/
export const HTMLCloseTag = /^<\/(?<tag>[a-zA-Z][^\s|>|/]*)>$/

export const HTMLTag = /^(?<pre>.*)(?<html><(?:\/?[a-zA-Z][^\s]*)(?:\s+[^\s|>]+)*>)(?<post>.*)$/
