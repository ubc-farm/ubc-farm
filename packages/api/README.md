# ubc-farm
Program for the [Centre for Sustainable Food Systems at UBC Farm](http://ubcfarm.ubc.ca/)

## Application Structure ##

### Backend
[backend](backend) scripts for node.js are contained here, including the server code. [koa v2](https://github.com/koajs/koa/tree/v2.x) is used as the server framework, but with Promises instead of the async function sugar. Keep server JavaScript files within this folder.

### Frontend
[frontend](frontend) contains JavaScript run in the browser, and is consequently designed to run in different potential enviornments. [src](frontend/src) contains code to be included through `<script>` tags while [workers](frontend/workers) contains Web, Shared, and Service Worker scripts. [vendor](frontend/vendor) has vendor scripts like Google Analytics and polyfills. These files are compiled into the build subfolder with content hashes and a manifest. 

### Assets
The [assets](assets) directory contains static files like images, fonts, robots.txt, etc. Built files are put into the static folder and should have content hash signs for better cache control, and am asset manifest file links the content hashes to the original file names. static is ignored by git.

### Docs
The docs directory is ignored by git as it contains a seperate repository, linked to the GitHub wiki.

### Styles
Styles are processed through [postcss-import](https://github.com/postcss/postcss-import) and [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables). This allows for the CSS to be broken into multiple files and allow for variables to be declared, following the standard CSS format. The functionality is intentionally kept simple. Compiled files have content hash suffixes and a [manifest.json](static/manifest.json) links to their names without the content hash.

### Views
[Marko](http://markojs.com/) is used as the template engine because of its JavaScript syntax, streaming support, and speed. The structure of the [views](views) folder reflects the website structure, except for helper folders prefixed with _. [_helpers](views/_helpers) are scripts for use in templates: `<script marko-init> require('./_helpers/*.js') </script>`. [_layouts](views/_layouts) contain page shells that can be used in pages through `<layout-use('./_layouts/*.marko')>`. [_partials](views/_partials) are included via `<include('./_partials/*.marko')>`. The [_taglib](views/_taglib) folder contains custom tags that can be invoked by using them as an html tag, such as `<hello-world>`.

### Test
[Mocha](mochajs.org) is the testing utility and [Chai](http://chaijs.com/) is used for assertions. 

## Environment Variables ##
Configuration is stored in different enviornment variables.

## Api Endpoints
* `GOOGLE_TOKEN`, the key for Google APIs

## Configuration
* `NODE_PORT`, the port the koa server runs on
* `WWW_STATIC`, the directory to output static files
* `REV_MANIFEST`, the full path to assest manifest json