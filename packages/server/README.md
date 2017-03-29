# ubc-farm
Server tool and core code for the ubc-farm program suite.

The server is a static file server that maps to folders in each page package.
Rather than have the server handle templates and data, files are precompiled
with other tools in this package.

## server
Creates and launches a static web server.
Files are loaded from the www folder, along with files from other page packages.
The returned promise resolves once the server begins listening on the provided
port.

```typescript
function server(port?: number): Promise<express.Application>
```

## listPagePackages
Obtains a list of ubc-farm page packages, along with their absolute paths in
the filesystem. Each package.json must have a "ubc-farm" property to be detected.
Additional data can be specified in the "ubc-farm" object, but if unspecified
defaults will be used.

- **url**: The name of the package, without the @ubc-farm prefix if present.
- **www**: The path to the folder containing public files. Defaults to "www".
- **views**: The path to the folder containing template files. Defaults to "views".

Paths are relative to the package.json location.

```typescript
interface PageData {
	name: string
	url: string
	paths: {
		www: string
		views: string
	}
}

function listPagePackages(): Promise<PageData[]>
```

## readData
YAML and JSON data files in the data folder represent information that is
provided to the handlebars templates. `readData` returns all the data in that
folder. The keys of the returned object correspond to the filenames of each
file in the data folder.

```typescript
function readData(): Promise<{ [filename: string]: any }>
```

## compileViews
Compiles the view files from the given folder and saves them to the given output
folder. Can be set to watch for futher changes. If watch is true, the files
in the from folder will be watched and recompiled when changes are made.
A FSWatcher object is returned.
If a folder starts with an underscore, it is ignored.

```typescript
function compileViews(options: { from: string, to: string, watch: true }): Promise<fs.FSWatcher>
function compileViews(options: { from: string, to: string }): Promise<void>
```

## compileAll
Runs `compileViews` in every packages' view folder (including this one).
The files can optionally be watched. By default, the view folder is a
sibling of the www folder named 'views'. This can be changed by altering
the `viewFolder` option.

```typescript
type GetViewFolder = (packageName: string) => Promise<string> | string;

function compileAll(options?: { viewFolder?: GetViewFolder, watch: true }): Promise<fs.FSWatcher[]>
function compileAll(options?: { viewFolder?: GetViewFolder }): Promise<void>
```


## Command Line API
npm registers the **ubc-farm** bin command, which can be called with different
mode arguments.

### serve
Calls `server()` with an optional `--port` (alias `-p`) argument.
```
ubc-farm serve --port 8080
```

### list
Calls `listAllPackages()`. If the `--paths` flag is used, the paths to each
package's static files will also be returned.
```
ubc-farm list --paths
```

### compile
Calls `compileViews()` with `--from` and `--to` path arguments. The `--watch`
flag can also be used to watch the files for changes instead of closing.
All arguments have aliases that correspond to the first letter of their name.
```
ubc-farm compile -f ./views -t ./www
```

### compile-all
Calls `compileAll()` with an optional `--watch` flag (alias `-w`).
```
ubc-farm compile-all --watch
```

### help
Shows a help dialog for the ubc-farm command line.
```
ubc-farm help
```
