import * as fs from 'fs';
import express from 'express'

/**
 * Creates and starts the server. Resolves once the server begins listening on
 * the provided port.
 */
export function server(port?: number): Promise<express.Application>

interface PageData {
	name: string
	url: string
	paths: {
		www: string
		views: string
	}
}

/**
 * Obtains a list of ubc-farm page packages, along with their absolute paths
 * in the filesystem.
 */
export function listPagePackages(): Promise<PageData[]>

/**
 * Loads data from the data directory and returns it.
 */
export function readData(): Promise<{ [filename: string]: any }>

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

/**
 * Compiles files from every packages' view folder and optionally watches them.
 * Takes results from `listPagePackages` to pick paths to watch.
 * @param options object
 * @param options.watch - if true, returns an array of FSWatchers for each package.
 */
export function compileAll(options: { watch: true }): Promise<fs.FSWatcher[]>
export function compileAll(options?: { watch?: boolean }): Promise<void>
