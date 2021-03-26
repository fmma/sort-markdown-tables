#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process'

const args = argv.slice(2);
const flags = args.filter(arg => arg.startsWith('-'));
const files = args.filter(arg => !arg.startsWith('-'));

if(flags.includes('-v') || flags.includes('--version')) {
    console.log('1.0.8');
    process.exit();
}

if(flags.includes('-h') || flags.includes('--help')) {
    console.log('Usage: sort-markdown-tables [OPTIONS] README.MD...');
    console.log('Sort tables preceeded with \'<!-- sort-table -->\' in README.MD file(s) and write to standard output.');
    console.log();
    console.log('  -a, --all       sort all tables regardless of \'<!-- sort-table -->\'');
    console.log('  -h, --help      show this help');
    console.log('  -i, --inplace   overwrite the input file(s) with the result instead of outputting to standard output');
    console.log('  -v, --version   prints the version number');
    process.exit();
}

const inplace = flags.includes('-i') || flags.includes('--inplace');
const allTables = flags.includes('-a') || flags.includes('--all');

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
            return p1 + sortTable(p2, linebreak.char);
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
