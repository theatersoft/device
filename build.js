'use strict'
require('shelljs/make')

const
    pkg = require('./package.json'),
    name = pkg.name.startsWith('@theatersoft') && pkg.name.slice(13),
    DIST = process.env.DIST === 'true',
    deleteKey = (o, k) => (k && delete o[k], o),
    dependencies = deleteKey(pkg.distDependencies, DIST && 'remote-redux-devtools'),
    path = require('path'),
    fs = require('fs'),
    copyright = `/*\n${fs.readFileSync('COPYRIGHT', 'utf8')}\n */`,
    rollup = require('rollup'),
    babel = require('rollup-plugin-babel'),
    ignore = require('rollup-plugin-ignore'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    strip = require('rollup-plugin-strip')

const targets = {
    node (format = 'cjs') {
        console.log('target node')
        exec('mkdir -p dist')
        const
            es = format === 'es' ? '.es' : '',
            dest = `dist/${name}${es}.js`
        rollup.rollup({
                entry: `src/index${es}.js`,
                external: [
                    'util',
                    ...Object.keys(dependencies)
                ],
                plugins: [
                    babel({
                        babelrc: false,
                        comments: !DIST,
                        minified: DIST,
                        //presets: [babili],
                        plugins: [
                            //require("babel-plugin-transform-class-properties"),
                            [require("babel-plugin-transform-object-rest-spread"), {useBuiltIns: true}]
                        ].concat(DIST ? [
                            require("babel-plugin-minify-constant-folding"),
                            //require("babel-plugin-minify-dead-code-elimination"), // FAIL NodePath has been removed so is read-only
                            require("babel-plugin-minify-flip-comparisons"),
                            require("babel-plugin-minify-guarded-expressions"),
                            require("babel-plugin-minify-infinity"),
                            require("babel-plugin-minify-mangle-names"),
                            require("babel-plugin-minify-replace"),
                            //FAIL require("babel-plugin-minify-simplify"),
                            require("babel-plugin-minify-type-constructors"),
                            require("babel-plugin-transform-member-expression-literals"),
                            require("babel-plugin-transform-merge-sibling-variables"),
                            require("babel-plugin-transform-minify-booleans"),
                            require("babel-plugin-transform-property-literals"),
                            require("babel-plugin-transform-simplify-comparison-operators"),
                            require("babel-plugin-transform-undefined-to-void")
                        ] : [])
                    }),
                    DIST && ignore(['remote-redux-devtools']),
                    DIST && strip({functions: ['devToolsEnhancer']}),
                    nodeResolve({jsnext: true})
                ]
            })
            .then(bundle => {
                bundle.write({
                        dest,
                        format,
                        moduleName: name,
                        banner: copyright,
                        sourceMap: !DIST
                    })
                    .then(() => console.log(`wrote ${dest}`))
            })
    },

    package () {
        const p = Object.assign({}, pkg, {
            private: !DIST,
            dependencies,
            distDependencies: undefined,
            devDependencies: undefined,
            scripts: pkg.distScripts,
            distScripts: undefined
        })
        fs.writeFileSync('dist/package.json', JSON.stringify(p, null, '  '), 'utf-8')
        exec('cp LICENSE README.md start.js .npmignore dist')
    },

    publish () {
        console.log('target publish')
        exec('npm publish --access=public dist')
    },

    all () {
        targets.node()
        targets.node('es')
        targets.package()
    }
}

Object.assign(target, targets)