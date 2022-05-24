console.info('%cExecute tree.js', 'color: #61B024');

const NEEDLE_CLASS = 'needle';

const paint = {
    container: document.getElementById('tree'),
    getNeedles: function() {
        return this.container.getElementsByClassName(NEEDLE_CLASS);
    },
    rows: 16,
    draw: function() {
        let fragment = '';

        for(let i = 1; i <= this.rows; i++) {
            for(let j = i; j <= this.rows; j++) {
                fragment += '&nbsp;&nbsp;';
            }
            for(let k = 0; k <= i*2; k++) {
                fragment += `<span class="${NEEDLE_CLASS}">1</span>`;
            }
            fragment += '<br />';
        }

        this.container.innerHTML = fragment;
    }
};

paint.draw();

export default paint;

// if(module.hot) {
//     module.hot.accept();
// }