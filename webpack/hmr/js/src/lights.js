console.info('%cExecute lights.js', 'color: #61B024');
// import paint from './tree.js';

const getNeedlesCount = rows => {
    return new Array(rows)
    .fill(0)
    .reduce( (sum, _, n) => sum + 2*(n+1) + 1, 0 );
};

const getRandomPosition = rows => {
    const needlesount = getNeedlesCount(rows);
    return Math.floor(Math.random() * needlesount);
};

const getRandomColor = () => {
    return '#' + Math.random().toString(16).substr(-6);
};

let blinkingBulbs = [];
function blink(rows, needles) {
    blinkingBulbs.forEach(bulb => {
        bulb.innerHTML = '1';
        bulb.style.color = 'green';
    });
    blinkingBulbs = [];

    const bulbsCount = rows * 3;
    new Array(bulbsCount).fill().forEach(_ => {
        const bulbIndex = getRandomPosition(rows);
        const bulb = needles[bulbIndex];
        if (!bulb) {
            return;
        }

        blinkingBulbs.push(bulb);
        bulb.innerHTML = '0';
        bulb.style.color = getRandomColor();
    });

}

let lightsInterval;
export function turnOn(paint) {
    const blinkRate = 1000;
    const rows = paint.rows;
    const needles = paint.getNeedles();

    lightsInterval = setInterval( () => blink(rows, needles), blinkRate);
}

export function restart(paint) {
    clearInterval(lightsInterval);
    turnOn(paint);
}

// turnOn();

if(module.hot) {
    // module.hot.accept();
    module.hot.dispose( _data => {
        clearInterval(lightsInterval);
    } );
}