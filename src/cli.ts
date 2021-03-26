#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process'

const args = argv.slice(2);
const flags = args.filter(arg => arg.startsWith('-'));
const files = args.filter(arg => !arg.startsWith('-'));

const inplace = flags.includes('-i');
const allTables = flags.includes('-a');

for(const file of files) {
    doFile(file);
}

function doFile(fp: string) {
    const content = readFileSync(fp).toString();
    const linebreak = getLineBreakChar(content);
    const sorted = allTables 
        ? content.replace(linebreak.regex, (a) => {
            return sortTable(a, linebreak.char);
        })
        : content.replace(new RegExp(`${/(<!-- sort-table -->\s*)/.source}(${linebreak.regex.source})`, 'g'), (_, p1, p2) => {
            return [p1, sortTable(p2, linebreak.char), ''].join(linebreak.char);
        })

    if(inplace) {
        writeFileSync(fp, sorted);
    }
    else {
        console.log(sorted);
    }
}

function sortTable(tableString: string, linebreak: string) {
    const [header, hr, ...lines] = tableString.split(linebreak);
    if(lines == null || lines.length === 0 || !/[\s\|:-]*/.test(hr))
        return tableString;
    const endingWhitespace = lines.pop();
    if(endingWhitespace != null && endingWhitespace.trim() !== '') {
        lines.push(endingWhitespace);
        return [header, hr, ... lines.sort()].join(linebreak);
    }
    return [header, hr, ... lines.sort(), endingWhitespace].join(linebreak);
}

function getLineBreakChar(string: string) {
    const indexOfLF = string.indexOf('\n', 1);  // No need to check first-character

    if (indexOfLF === -1) {
        if (string.indexOf('\r') !== -1) return { char: '\r', regex: /((\|[^|\r]*)+\|\r?)+/g};

        return { char: '\n', regex: /((\|[^|\n]*)+\|\n?)+/g};
    }

    if (string[indexOfLF - 1] === '\r') 
        return { char: '\r\n', regex: /((\|[^|\r\n]*)+\|(\r\n)?)+/g};

    return { char: '\n', regex: /((\|[^|\n]*)+\|\n?)+/g};
}
