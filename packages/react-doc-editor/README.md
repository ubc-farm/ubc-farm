# react-doc-editor
Provides a React element for forms that are used to create and edit PouchDB
documents. Intended to be used with
[react-reformed](https://github.com/davezuko/react-reformed).

A Notification element is also exported.

## API

### DocEditor
The main element. It should be used like an HTML form, where input elements
are placed inside the form. The `model` and `setModel` props from react-reformed
should be passed to this element.

When using the form, pass an object with an `_id` property as the model.
Additional data for the model is automatically loaded from the database.
The form expects to use the same object during its lifetime, so the ID will
always be the same.

Form inputs should use the `bindInput` function created by react-reformed.

Prop | Type | Description
---- | ---- | -----------
onDone | Function?: `() => void` | Called when the form has been submitted and saved to the database.
children | ReactElement(s) | Fields to render inside the form.
db | PouchDB.Database | Database where the model should be stored.
model | object | An object representing the form data. It should have an `_id` property which is used to load and save the data in the database.
noInit | boolean? | Normally, the model data will be loaded from the database and only the `_id` property needs to be set. If `noInit` is true, the initial model provided will be used instead of reloading it first.
setModel | Function: `(model: object) => void` | A function that replaces the model object.

### DocForm
A lower level version of DocEditor, with lifecycle hooks to handle submission
completion and errors, but no associated Notification element.
Its props are similar to that of DocEditor.

Prop | Type | Description
---- | ---- | -----------
mode | string? | Used to set the appearance of the submit button.
onSuccess | Function?: `(response: PouchDB.Core.Response) => void` | Called once the model has been saved.
onError | Function?: `(error: Error) => void` | Called if there is an error saving the model.
children | ReactElement(s) | Fields to render inside the form.
db | PouchDB.Database | Database where the model should be stored.
model | object | An object representing the form data. It should have an `_id` property which is used to load and save the data in the database.
noInit | boolean? | Normally, the model data will be loaded from the database and only the `_id` property needs to be set. If `noInit` is true, the initial model provided will be used instead of reloading it first.
setModel | Function: `(model: object) => void` | A function that replaces the model object.

### Notifcation
A wrapper around the notification component from Bulma.

**See:** [http://bulma.io/documentation/elements/notification/](http://bulma.io/documentation/elements/notification/)

Prop | Type | Description
---- | ---- | -----------
status | string? | Used to set the appearance of the notification.
onClose | Function?: `() => void` | Called when the notification's close button is clicked.
className | string? | Additional classes for the notification div.
