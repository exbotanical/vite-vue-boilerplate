const babelJest = require('babel-jest');

const babelOptions = {
	presets: ['@babel/preset-typescript']
};

module.exports = babelJest.default.createTransformer(babelOptions);
