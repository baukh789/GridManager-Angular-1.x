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
        option: '<'
    }
};
// TODO 需要对参数进行处理, 需要对公开方法进行处理
export default angular
    .module('gridManagerModule', [])
    .component('gridManager', GridManagerComponent)
    .name;