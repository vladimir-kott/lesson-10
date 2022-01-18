module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        "quotes": 0,
        "eol-last": 0,
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "semi": 0,
        indent: [0, 4],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ]
    }
};
