# Babel

```javascript
    let a = 10

    // AST 如下
    {
        type: "Program",
        start: 0,
        end: 10,
        body: [
            {
                type: 'VariableDeclaration',
                start: 0,
                end: 10,
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 10,
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 5,
                            name: 'a'
                        },
                        init: {
                            type: 'Literal',
                            start: '8',
                            end: 10,
                            value: 10,
                            raw: '10'
                        }
                    }
                ],
                kind: 'let'
            }
        ],
        sourceType: 'module'
    }
```
