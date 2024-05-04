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
			"sort-keys": "off"
		}
	}
];
