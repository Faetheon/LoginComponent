const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({watch: true}, webpackConfig)
    }
  });



  // grunt.registerTask(taskName, [optional description, ], taskFunction);
  grunt.registerTask('default', 'webpack');
  
  // grunt.loadNpmTasks('yourplugin');
  grunt.loadNpmTasks('grunt-webpack');
};