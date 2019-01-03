#! /bin/bash

set -e

function build() {
	# webpack build
	webpack --config webpack-config.js

	# create dist/index.js
	cat > dist/index.js <<- EOT
	require('./js/gm-angular.js');
	module.exports = 'gridManager';
	EOT
}

build $@
