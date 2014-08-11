module.exports = (grunt) ->

  grunt.initConfig
    mkdir:
      main:
        options:
          create: ['lib', 'test/lib']
    clean:
      main: ['lib', 'test/lib']
    coffee:
      main:
        expand: true
        cwd: 'src'
        src: ['**/*.coffee']
        dest: 'lib/'
        filter: 'isFile'
        ext: '.js'
        bare: true
      test:
        expand: true
        cwd: 'test/src'
        src: ['**/*.coffee']
        dest: 'test/lib'
        filter: 'isFile'
        ext: '.js'
        bare: true
    mochaTest:
      main:
        src: ['test/lib/**/*.js']

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'})

  grunt.registerTask('compile', ['mkdir', 'clean', 'coffee'])

  grunt.registerTask('test', ['compile', 'mochaTest'])
