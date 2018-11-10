/**
 * Created by baukh on 18/4/11.
 */
import gridManagerModule from '../js/index';


var app = angular.module("myApp", [gridManagerModule]);
app.controller('AppController', ['$window', '$rootScope', '$scope', '$element', function($window, $rootScope, $scope, $element) {
    var queryInfo = {pluginId: 1};
    $scope.a = 11233;

    // 常量: 搜索条件
    $scope.TYPE_MAP = {
        '1': 'HTML/CSS',
        '2': 'nodeJS',
        '3': 'javaScript',
        '4': '前端鸡汤',
        '5': 'PM Coffee',
        '6': '前端框架',
        '7': '前端相关'
    };
    $scope.option = {
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
            text: '<div>{{a}}</div>',
            // isShow: false,
            useCompile: true,
            template: type => {
                console.log(type);
                return `<button type="button" cc-tooltip="'hello world'" tooltip-type="error-minor" style="margin-top: 50px" ng-bind="TYPE_MAP[1]"></button>`;
                // return `<div>{{TYPE_MAP[row.type]}}</div>`;
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

    $scope.delectRowData = function(row) {
        var table = $element[0].querySelector('table[grid-manager="testAngular"]');
        if(window.confirm('确认要删除['+row.name+']?')){
            console.log('----删除操作开始----');
            table.GM('refreshGrid');
            console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
            console.log('----删除操作完成----');
        }
    };
}]);