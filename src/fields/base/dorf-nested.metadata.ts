import { FormGroup } from '@angular/forms';

import { IDorfCommonCssClasses, IDorfFieldCssClasses } from '../../base/dorf-css-classes';
import { PropertiesToDorfDefinitionsMap } from '../../base/dorf-mapper';
import { IDorfNestedDefinition, DorfNestedDefinition } from './dorf-nested.definition';
import { IDorfFieldMetadata, DorfMetadataBase } from './abstract-dorf-field.metadata';
import { DorfDomainObject } from '../../dorf-core.module';

/**
 * Specifies a special metadata for nested DORF objects.
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
     * Used by {@link DorfMapper}.
     */
    constructor(definition: IDorfNestedDefinition<T> = new DorfNestedDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    /**
     * Source of `nestedFieldsMetadata`, consumed by {@link DorfMapper}.
     */
    get definitionsForNestedObject(): PropertiesToDorfDefinitionsMap<T> {
        let val = this._value as any as DorfDomainObject;
        if (val.isDorfObject) {
            return val.fieldDefinitions;
        }
        throw new Error('DorfNestedObject has to be defined with DorfObject annotation');
    }

    /** @inheritdoc */
    get transparentFlow() { return this.definition.transparentFlow; }
    /** @inheritdoc */
    get columnsNumber() { return this.definition.columnsNumber; }

    /**
     * Indicator for HTML templates.
     */
    get isGroupingNested() { return true; }
}