// @ts-check

import assert from "node:assert";
import test from "node:test";
import extendedAscii from "../extended-ascii.cjs";
import { main as cli2 } from "markdownlint-cli2";
import { applyFixes } from "markdownlint-cli2/markdownlint";
import { lint, readConfig } from "markdownlint-cli2/markdownlint/promise";
import jsoncParse from "markdownlint-cli2/parsers/jsonc";
import yamlParse from "markdownlint-cli2/parsers/yaml";

const asciiViolations = [
	"extended-ascii-violations.md:5:1 extended-ascii Only extended ASCII characters are allowed [Blocked character: 'Ä']",
	"extended-ascii-violations.md:5:10 extended-ascii Only extended ASCII characters are allowed [Blocked character: 'ç']"
];
const extendedAsciiViolations = [
	"extended-ascii-violations.md:7:4 extended-ascii Only extended ASCII characters are allowed [Blocked character: '✅']",
	"extended-ascii-violations.md:9:6 extended-ascii Only extended ASCII characters are allowed [Blocked character: '“']",
	"extended-ascii-violations.md:9:12 extended-ascii Only extended ASCII characters are allowed [Blocked character: '”']",
	"extended-ascii-violations.md:11:15 extended-ascii Only extended ASCII characters are allowed [Blocked character: '—']",
	"extended-ascii-violations.md:13:11 extended-ascii Only extended ASCII characters are allowed [Blocked character: '８']",
	"extended-ascii-violations.md:13:17 extended-ascii Only extended ASCII characters are allowed [Blocked character: '？']"
];
const customRules = [ extendedAscii ];
const paramsBase = {
	"argv": [ "extended-ascii-violations.md" ],
	"directory": "test",
	"optionsOverride": {
		customRules
	}
};

test("extended ascii violations", async () => {
	const messages = [];
	const params = {
		...paramsBase,
		"logError": (message) => messages.push(message)
	}
	assert.equal(await cli2(params), 1);
	assert.deepEqual(messages, extendedAsciiViolations);
});

const getAsciiOnlyTest = (config, parser) =>
	async () => {
		const messages = [];
		const params = {
			...paramsBase,
			"logError": (message) => messages.push(message),
			"optionsOverride": {
				...paramsBase.optionsOverride,
				"config": await readConfig(config, [ parser ])
			}
		}
		assert.equal(await cli2(params), 1);
		assert.deepEqual(messages, [ ...asciiViolations, ...extendedAsciiViolations ]);
	};
test("ascii-only violations, JSON configuration", getAsciiOnlyTest("./test/config.json", jsoncParse));
test("ascii-only violations, YAML configuration", getAsciiOnlyTest("./test/config.yaml", yamlParse));

test("fixes for smart quotes and en/em dashes", async () => {
	const content = `Text “double” ‘single’ en–dash em—dash.\n`;
	const expected = `Text "double" 'single' en-dash em-dash.\n`;
	const results = await lint({
		"strings": { content },
		customRules
	});
	const actual = applyFixes(content, results.content);
	assert.equal(actual, expected);
});

test("no issues in project files", async () => {
	const params = {
		"argv": [ "*.md" ]
	}
	assert.equal(await cli2(params), 0);
});
