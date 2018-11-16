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

        this.option.compileAngularjs = compileList => {
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