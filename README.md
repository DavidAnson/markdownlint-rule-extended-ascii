# markdownlint-rule-extended-ascii

> A markdownlint rule that allows only extended ASCII characters

## Overview

This rule for the [Node.js markdownlint library][markdownlint] (and associated
tools) allows only [extended ASCII][extended-ascii] characters in Markdown
content. Specifically, it reports a violation whenever it finds characters that
are not part of the [ISO/IEC 8859-1 character set][iso-iec-8859-1] (aka "ISO
Latin 1", aka Unicode [Basic Latin][unicode-basic-latin] plus
[Latin-1 Supplement][unicode-latin-1-supplement]).

Informally, this extension limits Markdown content to just the printable
character codes less than 256. In other words, the standard 8-bit "western"
character set from the early days of computing. While this is too restrictive to
be practical for many purposes, it is basically all that's needed for basic
English text as found in most `README` files, documentation, source code, and so
on.

This rule will not be interesting to some people because it blocks the use of
[emoji][emoji] as well as characters commonly used across Asia. However, it
meaningfully prevents the accidental use of so-called
[smart-quotes][smart-quotes], inconsistent [em-dashes][em-dash], ambiguous
[full-width characters][full-width], and the like.

## Use

### Install

```bash
npm install markdownlint-rule-extended-ascii --save-dev
```

### Configure

If using [`markdownlint-cli`][markdownlint-cli]:

```bash
markdownlint --rules markdownlint-rule-extended-ascii *.md
```

If using [`markdownlint-cli2`][markdownlint-cli2] and a
`.markdownlint-cli2.jsonc` configuration file:

```json
...
```

If using [`markdownlint-cli2`][markdownlint-cli2] and a
`.markdownlint-cli2.yaml` configuration file:

```yaml
...
```

If using the [`markdownlint` extension for VS Code][vscode-markdownlint]:

*See the `markdownlint-cli2` examples above or refer to the extension documentation*

[em-dash]: https://en.wikipedia.org/wiki/Dash#Em_dash
[emoji]: https://en.wikipedia.org/wiki/Emoji
[extended-ascii]: https://en.wikipedia.org/wiki/Extended_ASCII
[full-width]: https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms
[iso-iec-8859-1]: https://en.wikipedia.org/wiki/ISO/IEC_8859-1
[markdownlint]: https://github.com/DavidAnson/markdownlint
[markdownlint-cli]: https://github.com/igorshubovych/markdownlint-cli
[markdownlint-cli2]: https://github.com/DavidAnson/markdownlint-cli2
[smart-quotes]: https://en.wikipedia.org/wiki/Quotation_marks_in_English#Smart_quotes
[unicode-basic-latin]: https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)
[unicode-latin-1-supplement]: https://en.wikipedia.org/wiki/Latin-1_Supplement
[vscode-markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
