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
    nodeunit:
      main: ['test/lib/test.js']

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-mkdir')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-nodeunit')

  grunt.registerTask('compile', ['mkdir', 'clean', 'coffee'])

  grunt.registerTask('test', ['compile', 'nodeunit'])
