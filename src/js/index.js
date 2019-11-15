import controller from './controller';
import $gridManager, { jTool } from 'gridmanager';
import 'gridmanager/css/gm.css';

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
const gridManagerModuel = angular.module('gridManager', []);

let name = gridManagerModuel
    .component('gridManager', GridManagerComponent)
    .value('$gridManager', $gridManager)
    .value('$jTool', jTool)
    .name;

gridManagerModuel.version = process.env.VERSION;

export { $gridManager, jTool };
export default name;
