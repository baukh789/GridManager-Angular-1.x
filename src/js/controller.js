/**
 * Created by baukh on 18/3/8.
 */
export default class GridManagerController {
    constructor($scope, $element, $compile, $gridManager) {
        this._$element = $element;
        this._$compile = $compile;
        this._$scope = $scope;
        this._$gridManager = $gridManager;
    }
    $onInit() {
        // 当前表格组件所在的域
        const _parent = this._$scope.$parent;

        // 获取当前组件的DOM
        const table = this._$element[0].querySelector('table');

        // 模板解析勾子，这个勾子在原生组件内通过sendCompile进行触发
        this.option.compileAngularjs = compileList => {
            return new Promise(resolve => {
                compileList.forEach(item => {
                    // 生成模板所需要的$scope, 并为$scope赋予传入的值
                    const elScope = _parent.$new(false); // false 不隔离父级
                    elScope.row = item.row;
                    elScope.index = item.index;
                    elScope.key = item.key;

                    // 通过compile将dom解析为angular对像
                    const content = this._$compile(item.el)(elScope);

                    // 将生成的内容进行替换
                    item.el.replaceWith(content[0]);
                });

                // 延时触发angular 脏检查
                setTimeout(() => {
                    _parent.$digest();
                    resolve();
                });
            });
        };

        // 调用原生组件进行实例化
        new this._$gridManager(table, this.option, query => {
            typeof(this.callback) === 'function' && this.callback({query: query});
        });
    }

    /**
     * 销毁钩子
     */
    $onDestroy() {
        // 销毁实例
        this._$gridManager.destroy(this.option.gridManagerName);
    }
}
GridManagerController.$inject = ['$scope', '$element', '$compile', '$gridManager'];
