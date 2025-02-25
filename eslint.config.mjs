// @ts-check

import js from "@eslint/js";

export default [
	js.configs.all,
	{
		"linterOptions": {
			"reportUnusedDisableDirectives": true
		},
		"rules": {
			"no-magic-numbers": "off",
			"no-ternary": "off",
			"no-undefined": "off",
			"one-var": "off",
			"sort-imports": "off",
			"sort-keys": "off"
		}
	}
];
