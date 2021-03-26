Sort a markdown table by the first column.

# Install

`npm install -g @fmma-npm/sort-markdown-tables`

# Example

Add `<!-- sort-table -->` in the markdown (Readme.md) file above the table:
```markdown
<!-- sort-table -->
| Unsorted | Table            |
| -------- | ---------------- |
| xxx      | should be third  |
| aaa      | should be first  |
| bbb      | should be second |
| yyy      | should be forth  |
```

Run the command:

```
$ sort-markdown-tables Readme.md
```

The output is

```markdown
<!-- sort-table -->
| Unsorted | Table            |
| -------- | ---------------- |
| aaa      | should be first  |
| bbb      | should be second |
| xxx      | should be third  |
| yyy      | should be forth  |
```

Make the change inplace with the `-i` flag:

```
$ sort-markdown-tables -i Readme.md
```

You can also sort all tables (with or without the `<!-- sort-table -->` tag) using the `-a` flag:

```
$ sort-markdown-tables -i -a Readme.md
```