interface ReactPouchTable<Doc extends PouchDB.Core.Encodable> {
	db: PouchDB.Database<Doc>,
	openDoc(id: string): void,
	onHover(id: string): void,
	onBlur(id: string): void,
}
