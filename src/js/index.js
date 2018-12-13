import gridManagerAngular from './gridmanager-angular-1.x';

const gridManager = angular.module('gridManager', [gridManagerAngular]);

gridManager.version = process.env.VERSION;

export default gridManager.name;