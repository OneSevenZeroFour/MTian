module.exports = {
//devtool:"source-map",
  entry:"./index.js",
  output:{
    path:__dirname+"/public",
    filename:"bundle.js"
  },
  module: {
    loaders:[{
			test: /\.js[x]?$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader'
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
		{
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		},
		{
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader'
		}, {
			test: /\.(jpg|png|gif|jpeg|woff|svg|eot|ttf)$/,
			loader: 'url-loader'
		}
    ]
  },
  devServer:{
    contentBase:"./public",
    inline:true,
    port:12345
  }
}
