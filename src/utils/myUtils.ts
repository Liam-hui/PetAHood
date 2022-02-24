import { FilterNameType, FilterType } from "@/types";

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]
  
export function entries<T>(obj: T): Entries<T> {
    return Object.entries(obj) as any;
}

export function updatedFilter(filter_: FilterType, filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean)  {
    let filter = { ...filter_ };
    for (const { id } of items) {
        const isSelected = filter[filterName].findIndex(x => x == id) != -1;
        filter = {
          ...filter,
          [filterName]: isSelected
            ? (isForceAdd ? filter[filterName] : filter[filterName].filter(x => x != id))
            : filter[filterName].concat(id)
        };
    }
    return filter;
  }
