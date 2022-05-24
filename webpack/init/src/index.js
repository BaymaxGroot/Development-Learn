import './index.css';
import './style.less';

const bell = require('./assets/bell.jpeg');

import {a} from './es6.js';

function createEle() {
    const div = document.createElement('div');
    div.classList.add('div');
    div.innerHTML = 'Hello webpack';
    document.body.append(div);
}

function createImage() {
    const img = document.createElement('img');
    img.src = bell;
    document.body.append(img);
}

createEle();
createImage();
a();