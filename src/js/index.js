/**
 * Created by baukh on 18/3/8.
 */
// TODO 直接在页面中可以调用, 但是在这里面引用后. CSS无效
// import '../../node_modules/gridmanager/css/gm.css';
import controller from './controller';

const template = '<table></table>';
export const GridManagerComponent = {
    controller,
    template,
    controllerAs: 'vm',
    bindings: {
        option: '<'
    }
};
export default angular
    .module('gridManagerModule', [])
    .component('gridManager', GridManagerComponent)
    .name;