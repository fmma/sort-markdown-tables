Not a table
```
exp ::= x
| c |
| b |
```

ccc
bbb
aaa

<!-- sort-table -->

| Unsorted | Table |
| -------- | ----- |
| aaa      | bbb   |
| xxx      | aaa   |
| bbb      | xxx   |
| yyy      | qqq   |
cc
bb
aa

<!-- sort-table -->

| Unsorted | Table |
| -------- | ----- |
| aaa      | bbb   |
| xxx      | aaa   |

c
b
a



<!-- sort-table -->
| Name                               | get/set                           | Type                                             | Default     | Description                                                                                  |
| ---------------------------------- | --------------------------------- | ------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------- |
| columns                            | Property: get                     | `FiksTableColumn<TEntity>[]`                     | N/A         | Get the list of fiks-table-column elements appended to this fiks-table.                      |
| entity                             | Property: get, set                | `{[field]:TEntity[],...}`                        | `undefined` | `<fiks-table>` uses `entity[field]` (of type `TEntity[]`) as data for the rows of the table. |
| field                              | Attribute: get,set, Property: get | `string`                                         | `undefined` | See entity property.                                                                         |
| filter                             | Property: get, set                | `(entity: TEntity) => boolean`                   | `undefined` | Filter the list of rows.                                                                     |
| indexColumn                        | Property: get                     | `FiksTableIndexColumn<TEntity>`                  | N/A         | Get the index column.                                                                        |
| multi-selectable / multiSelectable | all                               | `boolean`                                        | `false`     | Can multiple rows be selected at once?                                                       |
| no-index-column / noIndexColumn    | all                               | `boolean`                                        | `false`     | If set, the index column is not shown.                                                       |
| sort                               | Property: get, set                | `(entity1: TEntity, entity1: TEntity) => number` | `undefined` | Sort the list of rows using a comparer.                                                      |
| rows-per-page / rowsPerPage        | all                               | `number`                                         | `10`        | How many rows to display on each page.                                                       |
