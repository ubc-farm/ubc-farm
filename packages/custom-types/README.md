# Custom typings

Some third-party libraries don't have TypeScript typings, and
these files provide some to make using the libraries easier.

## Usage
Add the package to a `package.json` file's `devDependencies`.
For example:
```
{
	"dependencies": {
		"document-promises": "^3.1.2"
	},
	"devDependencies": {
		"@types/document-promises": "^3.1.2"
	}
}
```

Afterwards, use `lerna bootstrap` to add the local file as a dependency.
