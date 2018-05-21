/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/js/gm';
export default class GridManagerController {
    constructor($element) {
        this._$element = $element;
    }
    $onInit() {
        var table = this._$element[0].querySelector('table');
        table.GM(this.gmOption);
        GM.setScope(table, this.gmScope);
    }
}
GridManagerController.$inject = ['$element'];