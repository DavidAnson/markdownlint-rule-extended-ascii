// @ts-check

import assert from "node:assert";
import test from "node:test";
import { main as cli2 } from "markdownlint-cli2";
import markdownlint from "markdownlint-cli2/markdownlint";
const { promises } = markdownlint;
const { readConfig } = promises;
import jsoncParse from "markdownlint-cli2/parsers/jsonc";
import yamlParse from "markdownlint-cli2/parsers/yaml";

const asciiViolations = [
	"test/extended-ascii-violations.md:5:1 extended-ascii Only extended ASCII characters are allowed [Blocked character: 'Ä']",
	"test/extended-ascii-violations.md:5:10 extended-ascii Only extended ASCII characters are allowed [Blocked character: 'ç']"
];
const extendedAsciiViolations = [
	"test/extended-ascii-violations.md:7:4 extended-ascii Only extended ASCII characters are allowed [Blocked character: '✅']",
	"test/extended-ascii-violations.md:9:6 extended-ascii Only extended ASCII characters are allowed [Blocked character: '“']",
	"test/extended-ascii-violations.md:9:12 extended-ascii Only extended ASCII characters are allowed [Blocked character: '”']",
	"test/extended-ascii-violations.md:11:15 extended-ascii Only extended ASCII characters are allowed [Blocked character: '—']",
	"test/extended-ascii-violations.md:13:11 extended-ascii Only extended ASCII characters are allowed [Blocked character: '８']",
	"test/extended-ascii-violations.md:13:17 extended-ascii Only extended ASCII characters are allowed [Blocked character: '？']"
];

test("extended ascii violations", async (t) => {
	const messages = [];
	const params = {
		"argv": [ "test/extended-ascii-violations.md" ],
		"logError": (message) => messages.push(message)
	}
	assert.equal(await cli2(params), 1);
	assert.deepEqual(messages, extendedAsciiViolations);
});

test("ascii-only violations, JSON configuration", async (t) => {
	const messages = [];
	const params = {
		"argv": [ "test/extended-ascii-violations.md" ],
		"logError": (message) => messages.push(message),
		"optionsOverride": {
			"config": await readConfig("./test/config.json", [ jsoncParse ])
		}
	}
	assert.equal(await cli2(params), 1);
	assert.deepEqual(messages, [ ...asciiViolations, ...extendedAsciiViolations ]);
});

test("ascii-only violations, YAML configuration", async (t) => {
	const messages = [];
	const params = {
		"argv": [ "test/extended-ascii-violations.md" ],
		"logError": (message) => messages.push(message),
		"optionsOverride": {
			"config": await readConfig("./test/config.yaml", [ yamlParse ])
		}
	}
	assert.equal(await cli2(params), 1);
	assert.deepEqual(messages, [ ...asciiViolations, ...extendedAsciiViolations ]);
});

test("no issues in project files", async (t) => {
	const params = {
		"argv": [ "*.md" ]
	}
	assert.equal(await cli2(params), 0);
});
