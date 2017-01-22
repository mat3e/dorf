# DORF - simple form
Example of fast form creation in DORF.

1. _Person_ is `DorfDomainObject` with `FieldDefinitions` assigned to all the fields. 
2. It is a good practice to couple definitions directly with the class, as in the example. Alternatively it is possible to return all the definitions directly from `DetailComponent`.
3. In the example reactive form works for both adding and updating. Two-way communication (for and from the form) is presented in the example.
4. For the _Name_ field there is a special updating flag. This field is updated immediately on the _Person_.

This is a base for all other exaples.