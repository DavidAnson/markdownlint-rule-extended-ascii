// @ts-check

"use strict";

const blockedAsciiRe = /[^\x20-\x7e]/gu;
const blockedExtendedAsciiRe = /[^\x20-\x7e\xa0-\xff]/gu;
/** @type {Map<string, string>} */
const replacements = new Map([
	[ `“`, `"` ],
	[ `”`, `"` ],
	[ `‘`, `'` ],
	[ `’`, `'` ],
	[ `—`, `-` ]
]);

/** @type import("markdownlint").Rule */
module.exports = {
	"names": [ "extended-ascii" ],
	"description": "Only extended ASCII characters are allowed",
	"tags": [ "davidanson" ],
	"parser": "none",
	"function": (params, onError) => {
		const blockedCharacterRe = params.config["ascii-only"] ?
			blockedAsciiRe :
			blockedExtendedAsciiRe;
		params.lines.forEach((line, index) => {
			const violations = line.matchAll(blockedCharacterRe);
			for (const violation of violations) {
				const [ character ] = violation;
				const column = violation.index + 1;
				const fixInfo = replacements.has(character) ? {
					"editColumn": column,
					"deleteCount": 1,
					"insertText": replacements.get(character)
				} : undefined;
				onError({
					"lineNumber": index + 1,
					"detail": `Blocked character: '${character}'`,
					"range": [ column, 1 ],
					fixInfo
				});
			}
		});
	}
};
