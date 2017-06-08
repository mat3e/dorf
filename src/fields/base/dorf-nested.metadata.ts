import { FormGroup } from '@angular/forms';

import { IDorfCommonCssClasses, IDorfFieldCssClasses } from '../../base/dorf-css-classes';
import { PropertiesToDorfDefinitionsMap } from '../../base/dorf-mapper';
import { IDorfNestedDefinition, DorfNestedDefinition } from './dorf-nested.definition';
import { IDorfFieldMetadata, DorfMetadataBase } from './abstract-dorf-field.metadata';
import { DorfDomainObject } from '../../dorf-core.module';

/**
 * @whatItDoes Specifies a special metadata for nested DORF objects.
 *
 * @stable
 */
export class DorfNestedMetadata<T> extends DorfMetadataBase<T, IDorfNestedDefinition<T>>
    implements IDorfFieldMetadata<T>, IDorfNestedDefinition<T> {
    /**
     * Nested object should have properties or other nested objects and those should be stored as metadata.
     */
    public nestedFieldsMetadata: IDorfFieldMetadata<any>[];

    /**
     * Used rather by {@link DorfMapper}. Definition type should be always as detailed as possible (e.g. DorfSelectDefinition).
     */
    constructor(definition: IDorfNestedDefinition<T> = new DorfNestedDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get definitionsForNestedObject(): PropertiesToDorfDefinitionsMap<T> {
        let val = this._value as any as DorfDomainObject;
        if (val.isDorfObject) {
            return val.fieldDefinitions;
        }
        throw new Error('DorfNestedObject has to be defined with DorfObject annotation');
    }

    get transparentFlow() { return this.definition.transparentFlow; }
    get columnsNumber() { return this.definition.columnsNumber; }

    get isGroupingNested() { return true; }
}