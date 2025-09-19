export { prependDeclarations };

function prependDeclarations(source: string): string {
    let declarations = '';
    let regex = /(_[a-zA-Z0-9_-]+) =/g;
    let declarationsMap = new Map<string, null>();
    let names = source.match(regex);

    for(let i = 0; names && i < names.length; i++) {
        declarationsMap.set(names[i].slice(0, -2), null);
        console.log(names[i]);
    }
    declarationsMap.delete('_ftoa');
    declarationsMap.delete('_itoa');

    for(const [name, _] of declarationsMap) {
        declarations += 'let ' + name + ';\n';
    }

    return declarations + source;
}