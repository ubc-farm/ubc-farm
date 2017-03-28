import * as fs from 'fs';
import express from 'express'

/**
 * Creates and starts the server. Resolves once the server begins listening on
 * the provided port.
 */
export function server(port?: number): Promise<express.Application>

/**
 * Obtains a list of ubc-farm page packages, along with their absolute paths
 * in the filesystem.
 */
export function listPagePackages(): Promise<Map<string, string>>

/**
 * Loads data from the data directory and returns it.
 */
export function readData(): Promise<any>

interface ViewOptions {
	from: string,
	to: string,
	watch?: boolean,
}

/**
 * Compiles the view files in the given folder and saves them in the given
 * output folder. Can be set to watch for futher changes.
 * @param options.from - folder to load views from
 * @param options.to - folder to save views to
 * @param options.watch - if set to true, the files in from will be watched
 * and recompiled. A FSWatcher object is returned.
 */
export function compileViews(options: ViewOptions & { watch: true }): Promise<fs.FSWatcher>
export function compileViews(options: ViewOptions): Promise<void>

interface CompileOptions {
	viewFolder?: (packageName: string) => Promise<string> | string,
	watch?: boolean,
}

/**
 * Compiles files from every packages' view folder and optionally watches them.
 * Takes results from `listPagePackages` to pick paths to watch.
 * By default, the view folder is a sibling of the www folder named views.
 * This can be changed by altering the `viewFolder` option.
 * @param options object
 * @param options.viewFolder function to get the path to the view folder,
 * relative to the www folder.
 * @param options.watch - if true, returns an array of FSWatchers for each package.
 */
export function compileAll(options?: CompileOptions & { watch: true }): Promise<fs.FSWatcher[]>
export function compileAll(options?: CompileOptions): Promise<void>
