# DORF - different definition example (object from backend)
It is possible that app needs to support totally different `FieldDefinition` structure. It's not a matter of additional properties, which can be stored inside `extras` property.

1. Example `FieldDefinition` simulates a definition got from the backend, with the value already inside.
2. In the example Domain Object itself is a map of definitions.
3. Definitions are passed directly to the extended mapper and then there is a helper method for translating each one into the standard `FieldDefinition`.
4. There are simple conditions for mapping (e.g. just two `possibleValues` => radio button).