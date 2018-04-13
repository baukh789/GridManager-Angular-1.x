/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/css/gm.css';
import controller from './controller';

const template = '<table></table>';
export const GridManagerComponent = {
    controller,
    template,
    controllerAs: 'vm',
    bindings: {
        gmOption: '<'
    }
};
export default angular
    .module('gridManagerModule', [])
    .component('gridManager', GridManagerComponent)
    .name;