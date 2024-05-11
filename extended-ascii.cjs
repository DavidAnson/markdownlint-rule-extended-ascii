// @ts-check

"use strict";

const blockedAsciiRe = /[^\x20-\x7e]/gu;
const blockedExtendedAsciiRe = /[^\x20-\x7e\xa0-\xff]/gu;

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
				onError({
					"lineNumber": index + 1,
					"detail": `Blocked character: '${violation[0]}'`,
					"range": [ violation.index + 1, 1 ]
				});
			}
		});
	}
};
