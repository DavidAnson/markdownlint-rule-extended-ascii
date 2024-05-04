// @ts-check

const blockedCharacterRe = /[^\x20-\x7e\xa0-\xff]/g;

/** @type import("markdownlint").Rule */
export default {
	"names": [ "extended-ascii" ],
	"description": "Only extended ASCII characters are allowed",
	"tags": [ "davidanson" ],
	"parser": "none",
	"function": (params, onError) => {
		params.lines.forEach((line, index) => {
			const violations = line.match(blockedCharacterRe) || [];
			for (const violation of violations) {
				onError({
					"lineNumber": index + 1,
					"detail": `Blocked character: '${violation}'`
				});
			}
		});
	}
};
