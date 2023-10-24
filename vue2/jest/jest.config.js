module.exports = {
    rootDir: '../',
    setupFiles: ['<rootDir>/__test__/setup'],
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@$': '<rootDir>/src',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@kef/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.js$': '<rootDir>/__test__/jest.babel.js',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!popper.js)'],
    snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-vue'
    ],
    testMatch: [
        '**/__test__/components/**/*.test.(js)|**/__test__/*.(js)',
        '**/__test__/directives/**/*.test.(js)|**/__test__/*.(js)'
    ],
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!**/node_modules/**'
    ],
    coverageReporters: [
        'html',
        // 'text',
        'text-summary'
    ]
}
