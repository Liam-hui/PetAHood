import { store } from "@/store";
import { FilterNameType, FilterType } from "@/types";

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]
  
export function entries<T>(obj: T): Entries<T> {
    return Object.entries(obj) as any;
}

export function objectToValueLabelPair(object: any) {
    return entries(object).map(([value, label]) => { return { value, label } });
}

export function updatedFilter(filter_: FilterType, filterStringArray_: string[], filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean)  {
    let filter = { ...filter_ };
    let filterStringArray = filterStringArray_.slice();
    for (const { id, name} of items) {
        const isSelected = filter[filterName].findIndex(x => x == id) != -1;
        filter = {
          ...filter,
          [filterName]: isSelected
            ? (isForceAdd ? filter[filterName] : filter[filterName].filter(x => x != id))
            : filter[filterName].concat(id)
        };
        filterStringArray = isSelected
            ? (isForceAdd ? filterStringArray : filterStringArray.filter(x => x != name))
            : filterStringArray.concat(name);
    }
    return { filter, filterStringArray };
}

export function getIdsString(ids: string[]) {
    return ids.reduce(
        (prev, curr) => prev + (prev == "" ? "" : ", ") + curr
    , "")
}

export function getFilterString(filter: FilterType)  {
    let string = "";
    const filterList = store.getState().shopSearch.filterList;
    for (const [filterName, filters] of entries(filter)) {
        if (filterName == "specialCats" || filterName == "petTypes") {
            for (const id of filters) {
                try {
                    string += (string == "" ? "" : ", ") + filterList[filterName].find(x => x.id == id)!.name;
                } catch (e) {}
            }
        }
        else {
            const items = filterList[filterName].reduce(
                (previousValue, currentValue) => previousValue.concat(currentValue.subCats)
            , <any[]>[]).reduce(
                (previousValue, currentValue) => previousValue.concat(currentValue.items)
            , <any[]>[]);
            for (const id of filters) {
                try {
                    string += (string == "" ? "" : ", ") + items.find((x: any) => x.id == id)!.name;
                } catch (e) {}
            }
        }
    }
    return string;
}
