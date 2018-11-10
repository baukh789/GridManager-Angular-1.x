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
        const gmScope = this._$scope.$parent;

        const table = this._$element[0].querySelector('table');

        this.gmOption.compileVue = compileList => {
            compileList.forEach(item => {
                console.log(item.el.firstChild);
                const content = this._$compile(item.el.firstChild)(gmScope);
                angular.element(item.el).append(content);
            });
            setTimeout( () => {
                gmScope.$digest();
            });
        };
        table.GM(this.gmOption);
        GM.setScope(table, gmScope);

    }
}
GridManagerController.$inject = ['$scope', '$element', '$compile'];