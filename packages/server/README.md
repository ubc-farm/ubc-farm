# ubc-farm-server

Server code for the ubc-farm module suite. When run, the program will
automatically import Hapi plugins specified in other modules.

## Plugins
Each folder is checked for a package.json file with the following property:
```json
{
	"ubc-farm": {
		"server-plugin": {
			"register": "./some/path/to/plugin.js",
			"routes": { "prefix": "/webpage-prefix" }
		}
	}
}
```

The `register` path should lead to a Hapi plugin script, and it is resolved
relative to the package.json file. The avaliable options for the server-plugin
object match [Hapi's `server.register()` object schema](http://hapijs.com/api#serverregisterplugins-options-callback), except that
the plugin will only register once by default. Alternatively, you can specify
a string instead of an object and it will be used as the `register` value.

Additionally, the plugins [Inert](https://github.com/hapijs/<inert></inert>) and
[Vision](https://github.com/hapijs/vision)
(with [Handlebars](http://handlebarsjs.com) support) are included by default.

## Usage
```
> ubc-farm-server path1 path2 glob/*/
```
Multiple folders or glob patterns can be listed and are seperated by a space.
The package can be installed locally or globally using npm or yarn.
All glob arguments will only search for folders.

```
yarn global add ubc-farm/server
npm install ubc-farm/server -g
```

## Handlebars
Handlebars support is included via the Vision plugin. The following utilities
are included for use in templates:

### Variables
+ **base**: a prefix for URLs to resolve them relative to the root of the site.
  For example, in a page with the URL `example.com/folder/subpage`, base will be
	`../..`. It can then be prepended to some URL,
	such as `<link href="{{base}}/someplace">`
+ **reactRoot**: A stub for the React content in the page. By default, it
  creates a div with the id "reactRoot".
+ **params**: any path parameters from the route
+ **query**: any query string arguments in the URL

### Helpers
todo

### Partials
todo
