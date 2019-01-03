// import 'gridmanager';
// import 'gridmanager/css/gm.css';

import controller from './controller';

const template = '<table></table>';
const GridManagerComponent = {
    controller,
    template,
    controllerAs: 'vm',
    bindings: {
        option: '<',
        callback: '&'
    }
};
let name = null;
try {
    name = angular.module('gridManager').name;
} catch (e) {
    require('gridmanager');
    require('gridmanager/css/gm.css');
    const gridManager = angular.module('gridManager', []);

    name = gridManager
        .component('gridManager', GridManagerComponent)
        .value('$gridManager', window.GridManager)
        .name;

    gridManager.version = process.env.VERSION;
}

export default name;