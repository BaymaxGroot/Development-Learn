console.info('%cExecute index.js', 'color: #61B024');
import paint from './tree.js';
import { turnOn, restart } from './lights.js';

turnOn(paint);

if(module.hot) {
    module.hot.accept(['./tree.js', './lights.js'], () => {
        restart(paint);
    });
}