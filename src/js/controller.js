/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/js/gm';
export default class GridManagerController {
    constructor($scope, $element, $compile) {
        this._$element = $element;
        this._$compile = $compile;
        this._$scope = $scope;
    }
    $onInit() {
        // 当前表格组件所在的域
        const _parent = this._$scope.$parent;

        const table = this._$element[0].querySelector('table');

        var i = 0;
        this.option.compileAngularjs = compileList => {
            // TODO 这里明天需要处理一下， gm内部的 compileList不再以td为单位，而是以tr为单位
            console.log(compileList);
            compileList.forEach(item => {
                const elScope = _parent.$new(false);
                elScope.row = item.row;
                const content = this._$compile(item.el)(elScope);

                item.el.replaceWith(content[0]);
            });

            // 延时触发angular 脏检查
            setTimeout(() => {
                _parent.$digest();
            });
        };

        table.GM(this.option);
        GM.setScope(table, _parent);
    }
}
GridManagerController.$inject = ['$scope', '$element', '$compile'];