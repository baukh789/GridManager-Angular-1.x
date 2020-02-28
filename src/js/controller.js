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

        // 存储 angular scope
        this.angularCache = [];
    }

    /**
     * 清除已经不存在的 angular scope
     */
    updateCache() {
        this.angularCache = this.angularCache.filter(item => {
            const { el, scope } = item;
            if (!window.getComputedStyle(el).display) {
                // 清除framework.send 后存在操作的DOM节点
                const tree = el.querySelector('[tree-element]');
                tree && el.removeChild(tree);

                // 移除angular node
                scope.$destroy();
                el.remove();
            }
            return !!window.getComputedStyle(el).display;
        });
    }
    $onInit() {
        // 当前表格组件所在的域
        const _parent = this._$scope.$parent;

        const table = this._$element[0].querySelector('table');

        const { _$gridManager, option, callback } = this;
        option.compileAngularjs = compileList => {
            this.updateCache();
            return new Promise(resolve => {
                let scope = null;
                let el = null;
                const $new = _parent.$new.bind(_parent);
                const $compile = this._$compile;
                compileList.forEach(item => {
                    scope = $new(false); // false 不隔离父级
                    scope.row = item.row;
                    scope.index = item.index;
                    scope.key = item.key;
                    el = item.el;
                    el.replaceWith($compile(el)(scope)[0]);

                    this.angularCache.push({el, scope});
                });

                // 延时触发angular 脏检查
                setTimeout(() => {
                    _parent.$digest();
                    resolve();
                });
            });
        };

        new _$gridManager(table, option, query => {
            typeof(callback) === 'function' && callback({query: query});
            _$gridManager.setScope(table, _parent);
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
