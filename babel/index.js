import * as parser from "@babel/parser";
import traverse from '@babel/traverse';
import generator from '@babel/generator';

import fs from 'fs';


fs.readFile('./main.js', function(error, data) {
    const ast = parser.parse(data.toString(), { sourceType: 'module' });
    // console.log(JSON.stringify(ast));

    traverse.default(ast, {
        enter(item) {
            if(item.node.type === 'VariableDeclaration') {
                if(item.node.kind === 'let') {
                    item.node.kind = 'var';
                }
            }
        }
    });

    const result = generator.default(ast, {}, data.toString());
    fs.writeFile('./main-babel.js', result.code, {flag: 'w+'}, error => {
        console.log(error);
    })
});
