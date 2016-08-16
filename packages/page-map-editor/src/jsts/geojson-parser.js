import {io} from 'ubc-farm-ports/jsts';
import factory from './factory.js';

const {GeoJSONReader} = io;

/**
 * GeoJSONWriter seems to be broken; just extract the parser and run that
 * instead. GeoJSONWriter.write just runs parser.write anyways.
 * @type {jsts.io.GeoJSONParser}
 */
const reader = new GeoJSONReader(factory);
const {parser: writer} = reader;


/** Converts GeoJSON to JSTS Geometry */
const read = reader.read; 
/** Converts JSTS Geometry to GeoJSON Geometry */
const write = writer.write;

export {read, write};