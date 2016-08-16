# React Table
A data table that uses React, as well as new ES2015 collections (Map/Set/WeakMap). 

Tables generate data using `Column` objects, which have various methods used for generating table cells, and allowing for sorting columns and selecting rows.

Table data is expected to be in the form of a Map containing rows, where the keys are strings that become React keys and the values and WeakMaps. The WeakMaps have keys that correspond to the Column objects for the table, and their values are passed to `column.toElement` to get a `td` element.

The table code is split into seperate parts so it can be extended through a custom table container rather than the demo one provided.