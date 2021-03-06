module.exports = {
    "extends": "airbnb",
    "rules": {
        // enable additional rules
        "max-len": ["error", { "code": 220 }],
        "one-var": ["error", "always"],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "react/prop-types": 0
    },
    "parser": "babel-eslint",
    "globals": {
      "document": true
    }
};
