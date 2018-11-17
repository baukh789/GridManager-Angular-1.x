# GridManager Angular 1.x(开发中, 现仅作为参考)
> 基于 Angular 1.x 的 GridManager 封装, 用于便捷的在 Angular 中使用GridManager.

[![Build Status](https://travis-ci.org/baukh789/GridManager.svg?branch=master&style=flat-square)](https://travis-ci.org/baukh789/GridManager)
[![npm version](https://img.shields.io/npm/v/gridmanager.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager)
[![npm downloads](https://img.shields.io/npm/dt/gridmanager.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager)
[![coverage](https://img.shields.io/codecov/c/github/baukh789/GridManager.svg?style=flat-square)](https://codecov.io/gh/baukh789/GridManager)

## API
> 该文档为原生GridManager的文档，angular-1.x版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用angular模版外，其它使用方式相同。
- [API](http://gridmanager.lovejavascript.com/api/index.html)


## Demo
- [带搜索的表格](http://gridmanager.lovejavascript.com/demo/index.html)

## Core code
- [GridManager](https://github.com/baukh789/GridManager)
- [jTool](https://github.com/baukh789/jTool)

## ENV
ES2015 + webpack + angular 1.x + GridManager

## 安装
```
npm install gridmanager-angular.1.x --save
```

## 项目中引用
> 以内代码应该一般放在项目的index.js

```javascript
import GridManager from 'gridmanager-angular-1.x';
import 'gridmanager-angular-1.x/css/gm-angular.css';
export default angular
	.module('myApp', [GridManager])
	.controller('MainController', MainController)
	.name;
```

### 示例
```html
<grid-manager option="$ctrl.gmOptions"></grid-manager>
```

```javascript
export default class CustomerInfoCtrl {
	constructor() {
	    this.gmOptions = {
	        // 当前表格的key, 必须存在，且同一页面中不能存在相同值
            gridManagerName: 'test',

            // 数据来源, 详细使用请查阅[API ajax_data](http://gridmanager.lovejavascript.com/api/index.html#ajax_data)
            ajax_data: function () {
                return 'https://www.lovejavascript.com/blogManager/getBlogList';
            },

            ajax_type: 'POST',

            // 列配置, 详细使用请查阅[API columnData](http://gridmanager.lovejavascript.com/api/index.html#columnData)
            columnData: [
                {
                    key: 'pic',
                    remind: 'the pic',
                    width: '110px',
                    align: 'center',
                    text: '缩略图',
                    // 使用函数返回 dom node
                    template: function(pic, rowObject) {
                        var picNode = document.createElement('a');
                        picNode.setAttribute('href', `https://www.lovejavascript.com/#!zone/blog/content.html?id=${rowObject.id}`);
                        picNode.setAttribute('title', rowObject.title);
                        picNode.setAttribute('target', '_blank');
                        picNode.title = `点击阅读[${rowObject.title}]`;
                        picNode.style.display = 'block';
                        picNode.style.height = '58.5px';

                        var imgNode = document.createElement('img');
                        imgNode.style.width = '90px';
                        imgNode.style.margin = '0 auto';
                        imgNode.alt = rowObject.title;
                        imgNode.src = `https://www.lovejavascript.com/${pic}`;

                        picNode.appendChild(imgNode);
                        return picNode;
                    }
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
                    template: function() {
                        return `<button type="button" cc-tooltip="'hello world'" tooltip-type="error-minor" ng-click="testClick(row)" ng-bind="TYPE_MAP[row.type]"></button>`;
                    }
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
                    template: function(username){
                        return `<a class="plugin-action" href="https://github.com/baukh789" target="_blank" title="去看看${username}的github">${username}</a>`;
                    }
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
                    template: '<span class="plugin-action" gm-click="delectRowData">删除</span>'
                }
            ]
            // ...更多配置请参考API
        };
	}
}
```

### 调用公开方法
> GM对象挂在Element.prototype上，这里是通过angular方式获取table dom。无论通过哪种方式，只要获取到table dom就可通过GM函数调用方法。

```javascript
const table = $element[0].querySelector('table[grid-manager="test"]'); // 通过$element进行获取
const table2 = $document[0].querySelector('table[grid-manager="test"]'); // 通过$document进行获取
const table2 = document.querySelector('table[grid-manager="test"]'); // 通过原生JS进行获取

// 刷新
table.GM('refreshGrid');

// 更新查询条件
table.GM('setQuery', {name: 'baukh'});

// ...其它更多请直接访问API
```

### 查看当前版本

```javascript
import gridManager from 'gridmanager-angular-1.x';
console.log('GridManager', angular.module('gridManager').version);
```
