module.exports = {
    module: {
        rules: [{
            test: /\.sass$/,
            use: [{
                loader: "sass-loader",
                options: {
                    includePaths: ["./src/styles"]
                }
            }]
        }]
    }
}