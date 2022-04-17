const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[chunkhash].bundle.js",
    publicPath: "/",
  },
  resolve: {
		extensions: [".tsx", ".ts", ".js"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
			{
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
				options: {
					outputPath: 'images',
          name(resourcePath, resourceQuery) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
};