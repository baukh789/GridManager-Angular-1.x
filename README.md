# GridManager Angular 1.x[自3.0开始, 该库已与[GridManager](https://github.com/baukh789/GridManager)合并]
> 基于 Angular 1.x 的 GridManager 封装, 用于便捷的在 Angular 中使用GridManager.

![image](https://s2.ax1x.com/2019/04/16/AxA4xK.png)
[![Build Status](https://travis-ci.org/baukh789/GridManager.svg?branch=master&style=flat-square)](https://travis-ci.org/baukh789/GridManager)
[![npm version](https://img.shields.io/npm/v/gridmanager-angular-1.x.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-angular-1.x)
[![npm downloads](https://img.shields.io/npm/dt/gridmanager-angular-1.x.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-angular-1.x)
[![coverage](https://img.shields.io/codecov/c/github/baukh789/GridManager.svg?style=flat-square)](https://codecov.io/gh/baukh789/GridManager)

## 实现功能
| 功能 | 描述 |
| -: | :- |
| 宽度调整 | 表格的列宽度可进行拖拽式调整 |
| 位置更换 | 表格的列位置进行拖拽式调整 |
| 配置列 | 可通过配置对列进行显示隐藏转换 |
| 表头吸顶 | 在表存在可视区域的情况下,表头将一直存在于顶部 |
| 列固定 | 指定某列固定在左侧或右侧 |
| 排序 | 表格单项排序或组合排序 |
| 分页 | 表格ajax分页,包含选择每页显示总条数和跳转至指定页功能 |
| 用户偏好记忆 | 记住用户行为,含用户调整的列宽、列顺序、列可视状态及每页显示条数 |
| 序号 | 自动生成序号列 |
| 全选 | 自动生成全选列 |
| 导出 | 静态数据导出、动态数据导出、已选数据导出 |
| 打印 | 当前页打印 |
| 右键菜单 | 常用功能在菜单中可进行快捷操作 |
| 过滤 | 通过对列进行过滤达到快速搜索效果 |
| 合并 | 同一列下相同值的单元格可自动合并 |
| 树表格 | 可通过配置快速实现树型表格结构 |
| 行移动 | 可通过配置快速实现行位置移动 |

## API
> 该文档为原生GridManager的文档，angular-1.x版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用angular模版外，其它使用方式相同。
- [API](http://gridmanager.lovejavascript.com/api/index.html)

## Demo
> 该示例为原生GridManager的示例，angular-1.x版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用angular模版外，其它使用方式相同。
- [简单的示例](http://gridmanager.lovejavascript.com/demo/index.html)
- [复杂的示例](http://develop.lovejavascript.com/node_modules/gridmanager/demo/index.html)

## Core code
- [GridManager](https://github.com/baukh789/GridManager)
- [jTool](https://github.com/baukh789/jTool)

## ENV
ES2015 + webpack + angular 1.x + GridManager

## 安装
```
npm install gridmanager-angular-1.x --save
```

## 项目中引用
- es2015引入方式
```javascript
import gridManager from 'gridmanager-angular-1.x';
```

- 通过script标签引入
```html
<link rel="stylesheet" href="../node_modules/gridmanager-angular-1.x/css/gm-angular.css">
<script src="../node_modules/gridmanager-angular-1.x/js/gm-angular.js"></script>
```

### 示例
```html
<html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/gridmanager-angular-1.x/css/gm-angular.css">
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
      <script src="https://unpkg.com/gridmanager-angular-1.x/js/gm-angular.js"></script>
    </head>
    <body ng-app="myApp" ng-controller="AppController as vm">
      <grid-manager option="option" callback="callback(query)"></grid-manager>
    </body>
</html>
```

```javascript
function AppController($window, $rootScope, $scope, $element, $gridManager){
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
        info: ''
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
            info: ''
        };
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
        disableCache: false,
        ajaxData: function () {
            return 'https://www.lovejavascript.com/blogManager/getBlogList';
        },
        ajaxType: 'POST',

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
                    // 筛选选中项，字符串, 默认为''。 非必设项，选中的过滤条件将会覆盖query
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
}
AppController.inject = ['$window', '$rootScope', '$scope', '$element', '$gridManager'];

angular
	.module('myApp', ['gridManager'])
	.controller('AppController', AppController);
```

### 调用公开方法
> 通过依赖注入的方式，将$gridManager注入到Controller。

```javascript
// 刷新
$gridManager.refreshGrid('testAngular');

// 更新查询条件
$gridManager.setQuery('testAngular', {name: 'baukh'});

// ...其它更多请直接访问[API](http://gridmanager.lovejavascript.com/api/index.html)
```

### 查看当前版本

```javascript
import gridManager from 'gridmanager-angular-1.x';
console.log('GridManager', angular.module('gridManager').version);
```
