// @ts-check

const blockedCharacterRe = /[^\x20-\x7e\xa0-\xff]/gu;

/** @type import("markdownlint").Rule */
export default {
	"names": [ "extended-ascii" ],
	"description": "Only extended ASCII characters are allowed",
	"tags": [ "davidanson" ],
	"parser": "none",
	"function": (params, onError) => {
		params.lines.forEach((line, index) => {
			const violations = line.matchAll(blockedCharacterRe);
			for (const violation of violations) {
				onError({
					"lineNumber": index + 1,
					"detail": `Blocked character: '${violation[0]}'`,
					"range": [ violation.index + 1, 1 ]
				});
			}
		});
	}
};
