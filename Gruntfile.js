'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    connect: {
      demo: {
        options: {
          port: 8020,
          base: '.',
          hostname: '*',
          keepalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);

};