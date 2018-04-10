/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/js/gm';
export default class GridManagerController {
    constructor($scope, $element) {
        var table = $element[0].querySelector('table');
        table.GM(this.option);
    }
}
GridManagerController.$inject = ['$scope', '$element'];