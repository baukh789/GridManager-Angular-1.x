/**
 * Created by baukh on 18/4/11.
 */
var app = angular.module("myApp", ['gridManagerModule']);
app.controller('AppController', function($scope){
    var queryInfo = {pluginId: 1};
    $scope.option = {
        gridManagerName: 'testAngular',
        height: '400px',
        columnData: [{
            key: 'name',
            remind: 'the name',
            width: '100px',
            align: 'right',
            text: '名称',
            isShow: false,
            sorting: ''
        },{
            key: 'type',
            remind: 'the type',
            text: '分类',
            isShow: false,
            template: function(type, rowObject){
                return `
							<select>
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
            text: '使用说明'
        },{
            key: 'url',
            remind: 'the url',
            text: 'url'
        },{
            key: 'createDate',
            remind: 'the createDate',
            width: '100px',
            text: '创建时间',
            sorting: 'DESC',
            template: function(createDate, rowObject){
                return new Date(createDate).toLocaleDateString();
            }
        },{
            key: 'lastDate',
            remind: 'the lastDate',
            width: '100px',
            text: '最后修改时间',
            sorting: '',
            template: function(lastDate, rowObject){
                return new Date(lastDate).toLocaleDateString();
            }
        },{
            key: 'action',
            remind: 'the action',
            width: '10%',
            text: `<div>操作</div>`,
            template: function(action, rowObject){
                return '<span class="plugin-action del-action" onclick="delectRowData(this)" learnLink-id="'+rowObject.id+'">删除</span>';
            }
        }],
        supportRemind: true,
        isCombSorting:  true,
        supportAjaxPage: true,
        supportSorting: true,
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        query: queryInfo,
        pageSize: 20
    };
});