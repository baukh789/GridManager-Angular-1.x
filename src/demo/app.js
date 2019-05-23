/**
 * Created by baukh on 18/4/11.
 */
import gridManagerModule from '../js/index';
var app = angular.module("myApp", [gridManagerModule]);
app.controller('AppController', ['$window', '$rootScope', '$scope', '$element', '$gridManager', function($window, $rootScope, $scope, $element, $gridManager) {
    $scope.testClick = (row) => {
        console.log('click', row);
    };

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

    $scope.searchForm = {
        title: '',
        content: ''
    };

    /**
     * 搜索事件
     */
    $scope.onSearch = () => {
        console.log('onSearch');
        $gridManager.setQuery('testAngular', $scope.searchForm);
    };

    $scope.onReset = () => {
        $scope.searchForm = {
            title: '',
            content: ''
        };
    };

    // 事件: 初始化
    $scope.onInit = () => {
        $scope.initDisabled = true;
    };

    // 事件: 销毁
    $scope.onDestroy = () => {
        $scope.destroyDisabled = true;
    };

    // 表格渲染回调函数
    // query为gmOptions中配置的query
    $scope.callback = function(query) {
        console.log('callback => ', query);
    };

    $scope.option = {
        gridManagerName: 'testAngular',
        width: '100%',
        height: '100%',
        supportAjaxPage:true,
        isCombSorting: true,
        useRadio: true,
        useRowCheck: true,
        ajax_data: function () {
            return 'https://www.lovejavascript.com/blogManager/getBlogList';
        },
        checkedAfter: aa => {
            console.log(aa);
        },
        ajax_type: 'POST',

        columnData: [
            {
                key: 'pic',
                remind: 'the pic',
                width: '110px',
                align: 'center',
                text: '缩略图',
                // ng template
                template: `<a target="_blank" style="display:block; height:58.5px;" ng-href="https://www.lovejavascript.com/#!zone/blog/content.html?id={{row.id}}" title="点击阅读[{{row.title}}]">
                                <img style="width:90px;margin:0 auto;" ng-src="https://www.lovejavascript.com/{{row.pic}}" alt="{{row.title}}">
                            </a>`
            },{
                key: 'title',
                remind: 'the title',
                align: 'left',
                text: '标题',
                sorting: '',
                // 使用函数返回 ng template
                template: function() {
                    return '<a class="plugin-action" target="_blank" ng-href="https://www.lovejavascript.com/#!zone/blog/content.html?id={{row.id}}" title="点击阅读[{{row.title}}]">{{row.title}}</a>';
                }
            },{
                key: 'type',
                remind: 'the type',
                text: '博文分类',
                align: 'center',
                width: '150px',
                sorting: '',
                // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
                filter: {
                    // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                    option: [
                        {value: '1', text: 'HTML/CSS'},
                        {value: '2', text: 'nodeJS'},
                        {value: '3', text: 'javaScript'},
                        {value: '4', text: '前端鸡汤'},
                        {value: '5', text: 'PM Coffee'},
                        {value: '6', text: '前端框架'},
                        {value: '7', text: '前端相关'}
                    ],
                    // 筛选选中项，字符串, 未存在选中项时设置为''。 在此设置的选中的过滤条件将会覆盖query
                    selected: '3',
                    // 否为多选, 布尔值, 默认为false。非必设项
                    isMultiple: true
                },
                // isShow: false,
                template: `<button type="button" ng-click="testClick(row)" ng-bind="TYPE_MAP[row.type]"></button>`
            },{
                key: 'info',
                remind: 'the info',
                width: '300px',
                text: '简介'
            },{
                key: 'username',
                remind: 'the username',
                align: 'center',
                width: '100px',
                text: '作者',
                // 使用函数返回 dom string
                template: `<a class="plugin-action" href="https://github.com/baukh789" target="_blank" title="去看看{{row.username}}的github">{{row.username}}</a>`
            },{
                key: 'createDate',
                width: '130px',
                text: '创建时间',
                sorting: 'DESC',
                // 使用函数返回 htmlString
                template: function(createDate, rowObject){
                    return new Date(createDate).toLocaleDateString();
                }
            },{
                key: 'lastDate',
                width: '130px',
                text: '最后修改时间',
                sorting: '',
                // 使用函数返回 htmlString
                template: function(lastDate, rowObject){
                    return new Date(lastDate).toLocaleDateString();
                }
            },{
                key: 'action',
                remind: 'the action',
                width: '100px',
                align: 'center',
                text: '<span style="color: red">操作</span>',
                // 直接返回 htmlString
                template: '<span class="plugin-action" ng-click="delectRowData(row, index)">删除</span>'
            }
        ]
    };

    /**
     * 模拟删除
     * @param row
     * @param index
     */
    $scope.delectRowData = function(row, index) {
        if(window.confirm(`确认要删除当前页第[${index}]条的['${row.title}]?`)){
            console.log('----删除操作开始----');
            $gridManager.refreshGrid('testAngular');
            // $element[0].querySelector('table[grid-manager="testAngular"]').GM('refreshGrid');
            console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
            console.log('----删除操作完成----');
        }
    };
}]);
