/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/js/gm';
export default class GridManagerController {
    constructor($scope, $document, $element, $compile) {
        this._$element = $element;
        this._$document = $document;
        this._$compile = $compile;
        this._$scope = $scope;
    }
    $onInit() {
        // 当前表格组件所在的域
        const _parent = this._$scope.$parent;

        const table = this._$element[0].querySelector('table');

        this.option.compileAngularjs = compileList => {
            return new Promise(resolve => {
                compileList.forEach(item => {
                    const elScope = _parent.$new(false);
                    elScope.row = item.row;
                    elScope.index = item.index;
                    const content = this._$compile(item.el)(elScope);

                    item.el.replaceWith(content[0]);
                });

                // 延时触发angular 脏检查
                setTimeout(() => {
                    _parent.$digest();
                    resolve();
                });
            });
        };

        table.GM(this.option, query => {
            this.callback({query: query});
        });
        GM.setScope(table, _parent);
    }

    /**
     * 销毁钩子
     */
    $onDestroy() {
        // 清除右键菜单
        const menuDomList = this._$document[0].querySelectorAll('.grid-menu[grid-master]');
        [].forEach.call(menuDomList, menuDom => {
            menuDom.parentNode.removeChild(menuDom);
        });
    }
}
GridManagerController.$inject = ['$scope', '$document', '$element', '$compile'];