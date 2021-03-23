Sort a markdown table by the first column.

# Install

`npm install -g @fmma-npm/sort-markdown-tables`

# Example

Add `<!-- sort-table -->` in the markdown (Readme.md) file above the table:
```markdown
<!-- sort-table -->
| Unsorted | Table |
| -------- | ----- |
| xxx      | aaa   |
| aaa      | bbb   |
| bbb      | xxx   |
| yyy      | qqq   |
```

Run the command:

```
$ sort-markdown-tables Readme.md
```

Make the change inplace with the `-i` flag:

```
$ sort-markdown-tables -i Readme.md
```

You can also sort all tables (with or without the `<!-- sort-table -->` tag) using the `-a` flag:

```
$ sort-markdown-tables -i -a Readme.md
```