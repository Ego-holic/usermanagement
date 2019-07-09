module.exports = {
  productionSourceMap: false,
  devServer: {
    hot: true,
    proxy: {
      '/test': {
        // target: 'http://10.10.31.20:9000', // 撸姐
        // target: 'http://10.10.31.190:9000', // 赵元浩
        // target: 'http://10.10.31.186:9000', // 国
        // target: 'http://10.10.31.183:8011',
        target: 'http://api.identity.dev.zy-cast.com',
        changeOrigin: true, 
        pathRewrite: {
          '^/test': '',
          // '/api/':'http://localhost:3000/'
        },
      },
    },
  }
};