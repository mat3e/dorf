# DORF - `extras` property from the definition
This example shows how to cusomize `FieldDefinition` and how to improve existing library mechanisms.

1. `FieldDefinition` supports `extras` property which may be used for adding additional creation options. All `extras` properties will be presented directly on `FieldMetadata`.
2. For the input fields there is `placeholder` property added in the example.
3. In order to support new property inside `DorfInputComponent` an extension of the existing one was introduced.
4. Extension has its own HTML template which is based on the original one, but supports also a `placeholder` property.
5. `PersonDetailComponent` got an improved template for switching between `custom-input` and `dorf-input`.
6. For all the definitions there is another `extras` property added - `order` field.
7. There is an extension of `DorfMapper` which uses `order` for the real ordering operation. Another possibility was to interpret this property inside `PersonDetailComponent`.