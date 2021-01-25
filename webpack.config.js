module.exports = {
  entry: {
    main: "./website/static/js/index.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: "file-loader",

        options: {
          name: "[name].[ext]",
          outputPath: "../../website/static/dist",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/website/static/dist",
    filename: "[name].bundle.js",
  },
//   plugins: [
//     new webpack.ProvidePlugin({
//       React: "react",
//     }),
//   ],
};
