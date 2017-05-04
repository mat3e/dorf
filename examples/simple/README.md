# DORF - simple form
Example of fast form creation in DORF.

1. _Person_ is `DorfDomainObject` with `FieldDefinitions` assigned to all the fields. 
2. In the example reactive form works for both adding and updating. Two-way communication (for and from the form) is presented in the example.
3. For the _Name_ field there is a special updating flag. This field is updated immediately on the _Person_.
4. For the _Surname_ there is also `debounce` parameter which delays an updating.

This is a base for all other exaples.