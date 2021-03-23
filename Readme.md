# Install

`npm install -g @fmma-npm/sort-markdown-tables`

# Example

Add `<!-- sort-table -->` in markdown file above table:
```markdown
<!-- sort-table -->
| Unsorted | Table |
| -------- | ----- |
| xxx      | aaa   |
| aaa      | bbb   |
| bbb      | xxx   |
| yyy      | qqq   |
```

```
$ sort-markdown-tables Readme.md
$ sort-markdown-tables -i Readme.md
```