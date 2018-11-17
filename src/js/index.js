import gridManagerAngular from './gridmanager-angular-1.x';

import { version } from '../../package.json';
const gridManager = angular.module('gridManager', [gridManagerAngular]);

gridManager.version = version;

export default gridManager.name;