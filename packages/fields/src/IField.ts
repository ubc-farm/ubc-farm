export interface Field {
	_id: string;
	name: string;
	geometry?: GeoJSON.Polygon;
	location?: string | [number, number];
	area?: number;
}
