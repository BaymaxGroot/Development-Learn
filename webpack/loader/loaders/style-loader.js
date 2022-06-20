const path = require('path');

function styleLoader(source) {
    console.log(`Run self style-loader....`);
    // const script = `
    //     const styleEl = document.createElement('style');
    //     styleEl.innerHTML = ${JSON.stringify(source)};
    //     document.head.appendChild(styleEl);
    // `
    // return script;
}

styleLoader.pitch = function(remainingRequest, previousRequest, data) {
    const pa = remainingRequest.replace(/\\/g, '/');
    const script = `

        import style from '!!${pa}';
        
        const styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
    `
    return script;
}

module.exports = styleLoader;


