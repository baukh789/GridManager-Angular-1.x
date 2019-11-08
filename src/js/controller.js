/**
 * Created by baukh on 18/3/8.
 */
export default class GridManagerController {
    constructor($scope, $document, $element, $compile, $gridManager) {
        this._$element = $element;
        this._$document = $document;
        this._$compile = $compile;
        this._$scope = $scope;
        this._$gridManager = $gridManager;
    }
    $onInit() {
        // 当前表格组件所在的域
        const _parent = this._$scope.$parent;

        const table = this._$element[0].querySelector('table');

        this.option.compileAngularjs = compileList => {
            return new Promise(resolve => {
                compileList.forEach(item => {
                    const elScope = _parent.$new(false); // false 不隔离父级
                    elScope.row = item.row;
                    elScope.index = item.index;
                    elScope.key = item.key;
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
            typeof(this.callback) === 'function' && this.callback({query: query});
            this._$gridManager.setScope(table, _parent);
        });
    }

    /**
     * 销毁钩子
     */
    $onDestroy() {
        const gridManagerName = this.option.gridManagerName;
        // 清除右键菜单
        const menuDomList = this._$document[0].querySelectorAll(`.grid-menu[grid-master=${gridManagerName}]`);
        [].forEach.call(menuDomList, menuDom => {
            menuDom.parentNode.removeChild(menuDom);
        });

        // 销毁实例
        this._$gridManager.destroy(gridManagerName);
    }
}
GridManagerController.$inject = ['$scope', '$document', '$element', '$compile', '$gridManager'];
