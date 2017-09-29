// var webpack = require('webpack');

module.exports ={
	entry:__dirname + "/js/one.js",
	output:{
		path:__dirname +"/view/bin",
		filename:"one.js"
	},
	devServer: {
		contentBase:'./view'
	},
	module:{
		loaders:[
		{	
			test : /\.js$/,
			exclude:/node_modules/,
			loader:'babel-loader',
			query: {presets: ['react','es2015','stage-2'] }

			}
		]

	}
	// ,

	// plugins: [
 //    	"react-hot-loader/babel"
 //    // 开启react代码的模块热替换（HMR）
 //  ]
};

///{ test: /\.jsx?$/, loaders: ['jsx-loader?harmony'] }