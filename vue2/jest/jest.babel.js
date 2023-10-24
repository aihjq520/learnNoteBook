const presets = [
    [
        '@babel/preset-env',
        {
            'targets': {
                'browsers': [
                    '> 1%',
                    'last 2 versions',
                    'not ie <= 8'
                ],
                'node': 'current'
            }
        }
    ]
]

const plugins = [
    'transform-vue-jsx',
    [
        '@babel/plugin-transform-runtime',
        {
            'corejs': 3
        }
    ],
    '@babel/plugin-transform-modules-commonjs',
    [
        'import-bk-magic-vue',
        {
            'baseLibName': '@canway/cw-magic-vue'
        }
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-optional-chaining',
    [
        '@babel/plugin-proposal-decorators',
        {
            'legacy': true
        }
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions'
]

const comments = true

module.exports = require('babel-jest').createTransformer({
    presets,
    plugins,
    comments
})
