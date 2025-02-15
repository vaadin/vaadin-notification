# &lt;vaadin-notification&gt;

> ⚠️ Starting from Vaadin 20, the source code and issues for this component are migrated to the [`vaadin/web-components`](https://github.com/vaadin/web-components/tree/master/packages/vaadin-notification) monorepository.
> This repository contains the source code and releases of `<vaadin-notification>` for the Vaadin versions 10 to 19.

[&lt;vaadin-notification&gt;](https://vaadin.com/components/vaadin-notification) is a Web Component providing accessible and customizable notifications (toasts), part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-notification/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-notification/html-api)

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-notification)](https://www.npmjs.com/package/@vaadin/vaadin-notification)
[![Bower version](https://badgen.net/github/release/vaadin/vaadin-notification)](https://github.com/vaadin/vaadin-notification/releases)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-notification)
[![Build Status](https://travis-ci.org/vaadin/vaadin-notification.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-notification)
[![Coverage Status](https://coveralls.io/repos/github/vaadin/vaadin-notification/badge.svg?branch=master)](https://coveralls.io/github/vaadin/vaadin-notification?branch=master)
[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-notification)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/vaadinvaadin-notification.svg)](https://vaadin.com/directory/component/vaadinvaadin-notification)

<!--
```
<custom-element-demo height="120">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="vaadin-notification.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<vaadin-notification opened position="middle" duration="-1"></vaadin-notification>

<script>
  const notification = document.querySelector('vaadin-notification');

  notification.renderer = function(root) {
    root.textContent = 'Your work has been saved';
  };
</script>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-notification/master/screenshot.png" width="336" alt="Screenshot of vaadin-notification">](https://vaadin.com/components/vaadin-notification)

## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

### Polymer 2 and HTML Imports Compatible Version

Install `vaadin-notification`:

```sh
bower i vaadin/vaadin-notification --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vaadin-notification/vaadin-notification.html">
```
### Polymer 3 and ES Modules Compatible Version

Install `vaadin-notification`:

```sh
npm i @vaadin/vaadin-notification --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-notification/vaadin-notification.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/vaadin-notification.html`

- The component with the Material theme:

  `theme/material/vaadin-notification.html`

- Alias for `theme/lumo/vaadin-notification.html`:

- `vaadin-notification.html`


## Running demos and tests in a browser

1. Fork the `vaadin-notification` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) and [Bower](https://bower.io) installed.

1. When in the `vaadin-notification` directory, run `npm install` and then `bower install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:3000/components/vaadin-notification/demo
  - http://127.0.0.1:3000/components/vaadin-notification/test


## Running tests from the command line

> [!WARNING]
> Running tests locally from the CLI does not work due to outdated dependencies. Run tests via SauceLabs or in the browser instead.

1. When in the `vaadin-notification` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
