module.exports = function(grunt) {
	pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        cssmin: {
			minify: {
			expand: true,
			cwd: 'css/',
			src: ['*.css', '!*.min.css'],
			dest: 'css/',
			ext: '.min.css'
		  }
		},
		concat: {
			options: {
			  separator: ''
			},
			dist: {
			  src: ['js/1.js', 'js/2.js', 'js/3.js'],
			  dest: 'js/built.js'
			}
		},
		coffee: {
		  glob_to_multiple: {
			options:{
				bare: true
			},
			expand: true,
			//flatten: true,
			cwd: 'coffee',
			src: ['*.coffee'],
			dest: 'js',
			ext: '.js'
		  }
		/*
		 compileBare: {
			options: {
			  bare: true
			},
			files: {
			  'js/script.js': 'coffee/script.coffee'//, // 1:1 compile
			  //'js/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
			}
		}
		*/
	  },
	  watch: {
          /*
			coffee: {
				files: ['coffee/*.coffee'],
				tasks: ['coffee'],  // Можно несколько: ['lint', 'concat'],
				options: {
                    spawn: false,
                    event: ["changed", "added", "deleted"],
					livereload: true
                }
			},
			*/
			compass: {
				files: ['sass/{,**/}*.scss'],
				tasks: ['compass:dev'],
				options: {
                    spawn: false,
                    event: ["changed", "added", "deleted"],
					livereload: true
                }
			},
            jst: {
                files: ['js/jst/**/*.html'],
                tasks: ['jst:compile'],
                options: {
                    spawn: false,
                    event: ["changed", "added", "deleted"]
                }
            }
	  },
	  uglify:{
		js:{
			files:{
				//'js/script.min.js':['js/script.js']
				'js/script.min.js':['js/script.min.js']
			},
			options: {
				beautify: {
				  width: 80,
				  beautify: true
				}
			}
		}
	  },
	   jst: {
            compile: {
                options: {
                    namespace: 'JST',
                    prettify: true,
					processName: function(filename) {
                        var end = filename.indexOf('.html'), //заканчиваем обрезать перед расширением
							start = filename.lastIndexOf('/');  //начинаем обрезать от последнего слеша в url
                        return filename.substring(start+1, end);  //шаблон будет иметь имя аналогичное файлу
                    },
                    processContent: function(src) {
                        return src.replace(/(^\s+|\s+$)/gm, ''); //обрезаем все отступы в шаблоне
                    }/*,
                    templateSettings: {
                        interpolate: /\{\{\=(.+?)\}\}/gim,
                        evaluate: /\{\{(.+?)\}\}/gim
                    }
					*/
                },
                files: {
                    "js/templates/templates.js": ["js/jst/**/*.html"]
                }
            }
        },
        compass:{
            dev:{
                options:{
                    //httpPath = "/",
                    debugInfo:true,
                    sassDir:'sass',
                    cssDir:'css',
                    imagesDir:'img',
                    javascriptDir:'js',
                    //fontsDir:'fonts',
                    //specify:[], only this file should be compiled
                    //noLineComments:true, //remove debug lines
                    //outputStyle:'compact', //compression type nested|expanded|compressed|compact
                    force:true//, //allow to rewrite existing files
                    //clean:true //clean cash
                    //environment: 'production'
                }
            },
            prod:{
                options:{
                    debugInfo:false,
                    sassDir:'sass',
                    cssDir:'css',
                    noLineComments:false, //remove debug lines
                    outputStyle:'compressed', //compression type nested|expanded|compressed|compact
                    force:true//, //allow to rewrite existing files
                }
            }
        },
		 requirejs:{
             //simple require.js build - finally we need require.js+index.js
			compile:{
				options:{
					baseUrl: "js",
					mainConfigFile: "js/config.js",
					name:"config",
					out: "js/index.js"
				}
			},
             //super advanced :-) almond.js build - finally we need only index.min.js
             mainJS: {
                 options: {
                     almond:true,
                     baseUrl: "js",
                     wrap: true,
                     name: "libs/requirejs/almond",
                     preserveLicenseComments: false,
                     optimize: "uglify2",
                     mainConfigFile: "js/config.js",
                     include: ["config"],
                     out: "js/index.min.js"
                 }
             }
		 }


    });
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	
	
	
    grunt.registerTask('default', ['cssmin', 'concat']);
    grunt.registerTask('watchcoffee', ['watch:coffee']);
    grunt.registerTask('compilecoffee', ['coffee']);
    grunt.registerTask('compressjs', ['uglify:js']);
    grunt.registerTask('compiletemplates', ['jst']);
	grunt.registerTask('compilecompass',['compass']);
	grunt.registerTask('watchcompass',['watch:compass']);
	grunt.registerTask('compilerequire',['requirejs']);
	grunt.registerTask('build',['compass:prod','jst:compile','requirejs:mainJS']);

};