/* jshint node:true */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      app: {
        expand: true,
        cwd: 'client/js',
        src: ['**/*.js', '!lib/**']
      }
    },

    clean: {
      build: 'build',
      generated: 'build/generated'
    },

    copy: {
      img: {
        expand: true,
        cwd: 'client/img',
        src: ['**'],
        dest: 'build/img'
      },
      fonts: {
        expand: true,
        cwd: 'client/fonts',
        src: ['**'],
        dest: 'build/fonts'
      }
    },

    stylus: {
      options: {
        compress: false
      },
      compile: {
        expand: true,
        cwd: 'client/css',
        src: ['app.styl'],
        dest: 'build/css',
        ext: '.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('test', []);
  grunt.registerTask('build', ['clean:build', 'copy:img', 'copy:fonts', 'stylus', 'concat', 'uglify', 'htmlmin', 'cssmin', 'clean:generated']);
};
