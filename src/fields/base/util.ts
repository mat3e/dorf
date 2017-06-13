import { IDorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfNestedMetadata } from './dorf-nested.metadata';

/**
 * Runs against {@link IDorfFieldMetadata} and returns a grouped version.
 * Metadata in form is always grouped, depending on [the value form config]{@link DorfConfigService#columnsNumber}.
 * By default there are no columns, so each [metadata]{@link DorfFieldMetadata} is in a single-element array.
 *
 * It is used internally by decorators and {@link DorfFieldMetadata}.
 *
 * @param source array with multiple metadata, to be grouped
 * @param elemsInGroup number of columns
 * @param lastingElems optional parameter, used when recurrence occurs
 *
 * @stable
 */
export function groupMetadata(source: IDorfFieldMetadata<any>[], elemsInGroup: number,
    lastingElems: IDorfFieldMetadata<any>[] = []): (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[] {

    let result: (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[] = [];

    let gu = new GroupingUtil(elemsInGroup, lastingElems);

    let sourceLength = source.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < sourceLength; ++i) {
        let currElem = source[i];
        let currGroup = null;
        if (currElem instanceof DorfNestedMetadata) {
            if (!currElem.transparentFlow) {
                let currTemp = gu.currGroupState;
                if (currTemp.length > 0) {
                    result.push(currTemp);
                }
                result.push(currElem);
                gu.restart();
            } else {
                let groupsFromNested = groupMetadata(currElem.nestedFieldsMetadata, elemsInGroup, gu.currGroupState);
                let last = groupsFromNested[groupsFromNested.length - 1];
                if (!(last instanceof DorfNestedMetadata) && last.length < elemsInGroup) {
                    gu.restoreFromElems(groupsFromNested.pop() as IDorfFieldMetadata<any>[]);
                } else {
                    gu.restart();
                }
                result = result.concat(groupsFromNested);
            }
        } else {
            currGroup = gu.fillWithElem(currElem);
        }

        if (currGroup) {
            result.push(currGroup);
        }
    }

    if (gu.currGroupState.length > 0) {
        result.push(gu.currGroupState);
    }

    return result;
}

/**
 * @hidden
 * @internal
 */
class GroupingUtil {
    private _group: IDorfFieldMetadata<any>[];
    private _elemsInGroup: number;
    /** grows from 0 to _elemsInGroup */
    private _index: number;

    private static assertCanSetGroup(group: IDorfFieldMetadata<any>[], elemsInGroup: number) {
        if (group && group.length > elemsInGroup) {
            throw new Error(`You passed a group with more elements than defined: ${elemsInGroup}`);
        }
    }

    constructor(elemsInGroup: number, groupToStartWith: IDorfFieldMetadata<any>[] = []) {
        GroupingUtil.assertCanSetGroup(groupToStartWith, elemsInGroup);

        this._group = groupToStartWith || [];
        this._elemsInGroup = elemsInGroup;
        this._index = groupToStartWith.length;
    }

    get currGroupState() {
        return this._group;
    }

    restoreFromElems(elems: IDorfFieldMetadata<any>[]): IDorfFieldMetadata<any>[] {
        GroupingUtil.assertCanSetGroup(elems, this._elemsInGroup);

        this.restart();

        let result: IDorfFieldMetadata<any>[] = null;
        for (let elem of elems) {
            result = this.fillWithElem(elem);
        }

        return result;
    }

    fillWithElem(elem: IDorfFieldMetadata<any>): IDorfFieldMetadata<any>[] {
        this._group.splice(this._index, 0, elem);
        ++this._index;

        let result: IDorfFieldMetadata<any>[] = null;
        if (this._group.length === this._elemsInGroup) {
            result = this._group;
            this.restart();
        }

        return result;
    }

    restart() {
        this._group = [];
        this._index = 0;
    }
}
