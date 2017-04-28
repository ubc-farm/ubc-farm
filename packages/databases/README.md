# @ubc-farm/databases

Contains definitions for PouchDB databases used throughout the ubc-farm modules.

Each root file in `src/` is a seperate database.

## Equipment

## Invoices
Invoices store data about farm sales and purchases. Each invoice has an
array of sales, along with data about the delivery date and channel.
Invoices with the `isPurchase` flag represent purchases that the farm made,
rather than sales of farm products to other parties.

## Locations
Entries in this database include locations around the farm, such as buildings
and storage locations. Fields in the farm are also stored here.

Latitude and longitude data are stored as GeoJSON objects under the `geometry`
property. Normal locations use Point objects, and fields use Polygon objects.

## Long Term
Data for the graphs page is stored here. The `generateToday` function is meant
to be run every 24 hours, and automatically acquires the totals from other
databases. The date is used as an ID.

## People
Each person in the database is stored here. Employees and researchers have
additional properties to store specific data.

## Plants
Data about different plant varieties, pulled from a external CSV file.

## Task Types
The different types avaliable for tasks to use, along with colors to identity
them.

## Tasks
Tasks represent actions performed on different locations at the farm. The
past task entries can be used to calculate the current state of the field.
