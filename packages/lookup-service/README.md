# lookup-service

Used to lookup plant information via REST API.

## GET `/:latinName`
Given the latin name of a plant, returns an object with links to other resources

### Return values
+ `image` - image URL of plant from Wikipedia
+ `info` - link to Wikipedia page

### Example
```http
GET /{prefix}/Daphne_alpina

{
  "image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Daphne_alpina_1.jpg",
  "info": "https://en.wikipedia.org/wiki/Daphne_alpina"
}
```

## GET `/:latinName/:property`
Similar to `/:latinName` route, but returns a specific value from the object instead.
