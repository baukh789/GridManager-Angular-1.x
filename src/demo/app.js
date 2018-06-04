/**
 * Created by baukh on 18/4/11.
 */
import gridManagerModule from '../js/index';

var app = angular.module("myApp", [gridManagerModule]);
app.controller('AppController', ['$window', '$element', '$http', function($window, $element, $http) {
    var queryInfo = {pluginId: 1};
    this.option = {
        gridManagerName: 'testAngular',
        height: '400px',
        columnData: [{
            key: 'name',
            remind: 'the name',
            width: '100px',
            align: 'right',
            text: '名称',
            sorting: ''
        },{
            key: 'type',
            remind: 'the type',
            text: '分类',
            isShow: false,
            template: type => {
                return `<select>
                            <option value="1" ${type === 1 ? 'selected="selected"' : ''}>前端框架、插件</option>
                            <option value="2" ${type === 2 ? 'selected="selected"' : ''}>javaScript相关链接</option>
                            <option value="3" ${type === 3 ? 'selected="selected"' : ''}>css相关链接</option>
                            <option value="4" ${type === 4 ? 'selected="selected"' : ''}>html相关链接</option>
                            <option value="4" ${type === 5 ? 'selected="selected"' : ''}>工具类相关链接</option>
                            <option value="4" ${type === 6 ? 'selected="selected"' : ''}>其它链接</option>
                        </select>`;
            }
        },{
            key: 'info',
            remind: 'the info',
            isShow: false,
            text: '使用说明'
        },{
            key: 'url',
            remind: 'the url',
            text: 'url',
            // 使用函数返回 dom node
            template: function(url) {
                var urlNode = document.createElement('a');
                urlNode.setAttribute('href', url);
                urlNode.setAttribute('title', url);
                urlNode.setAttribute('target', '_blank');
                urlNode.innerText = url;
                return urlNode;
            }
        },{
            key: 'createDate',
            remind: 'the createDate',
            width: '100px',
            text: '创建时间',
            sorting: 'DESC',
            // 使用函数返回 htmlString
            template: function(createDate, rowObject){
                return new Date(createDate).toLocaleDateString();
            }
        },{
            key: 'lastDate',
            remind: 'the lastDate',
            width: '100px',
            text: '最后修改时间',
            sorting: '',
            // 使用函数返回 htmlString
            template: function(lastDate, rowObject){
                return new Date(lastDate).toLocaleDateString();
            }
        },{
            key: 'action',
            remind: 'the action',
            width: '10%',
            text: '操作',
            template: function(action, rowObject){
                return '<span class="plugin-action del-action" gm-click="delectRowData">删除</span>';
            }
        }],
        supportRemind: true,
        isCombSorting:  true,
        supportAjaxPage: true,
        supportSorting: true,
        ajax_data: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        query: queryInfo,
        pageSize: 20
    };

    this.delectRowData = function(row) {
        var table = $element[0].querySelector('table[grid-manager="testAngular"]');
        if(window.confirm('确认要删除['+row.name+']?')){
            console.log('----删除操作开始----');
            table.GM('refreshGrid');
            console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
            console.log('----删除操作完成----');
        }
    };
}]);