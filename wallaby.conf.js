/* eslint-disable global-require*/

module.exports = (wallabyJS) => ({
	files: [
		'**/!(*.test).js',
		'!node_modules/**'
	],
	
	tests: [
		'**/*.test.js',
		'!node_modules/**'
	],
   
	env: {
		type: 'node'
	},

	testFramework: 'jest',
});