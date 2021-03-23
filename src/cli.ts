import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process'

const inplace = argv[2] === '-i';
const fp = inplace ? argv[3] : argv[2];

function sortTable(tableString: string) {
    const [header, hr, ...lines] = tableString.trim().split('\r\n');
    return [header, hr, ... lines.sort()].join('\r\n');
}
const content = readFileSync(fp).toString();

const sorted = content.replace(/(<!-- sort-table -->\s*)(((\|[^|\r\n]*)+\|(\r?\n|\r)?)+)/g, (_, p1, p2) => {
    return [p1, sortTable(p2), ''].join('\r\n');
});

if(inplace) {
    writeFileSync(fp, sorted);
}
else {
    console.log(sorted);
}