import api from '@/api';
import { entries } from '@/utils/myUtils';

export async function getDistrictsApi() {
  try {
    const { data } = await api.get('/resources/districts');
    const districts = data.payload.map((x: any) => {
      return {
        name: x.name,
        subCats: x.districts.map((x: any) => {
          return {
            name: x.name,
            items: x.sub_districts
          };
        })
      }
    })
    return {
      isSuccess: true,
      data: districts,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getPetTypesApi() {
  try {
    const { data } = await api.get('/resources/pet_types');
    return {
      isSuccess: true,
      data: entries(data.payload).map(([id, name]) => {
        return { id: Number(id), name: String(name) }
      }),
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getNeedTypesApi() {
  try {
    const { data } = await api.get('/resources/need_types');
    const needTypes = data.payload.map((x: any) => {
      return {
        name: x.name,
        subCats: x.sub_cats.map((x: any) => {
          return {
            name: x.name,
            items: Object.entries(x.sub_cats).map(([id, name]) => { return { id, name } })
          };
        })
      }
    })
    return {
      isSuccess: true,
      data: needTypes,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getSpecialCatsApi() {
  try {
    const { data } = await api.get('/resources/buSpecialCategory');
    return {
      isSuccess: true,
      data: entries(data.payload).map(([id, name]) => {
        return { id: Number(id), name: String(name) }
      }),
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getShopSearchResultApi(params?: any, page?: number) {
  try {
    const { data } = await api.get('/bu/', 
      { 
        headers: {
          ...params.location && {
            "LatLocation": params.location.lat,
            "LngLocation": params.location.long
          }
        },
        params : {
          // default sort by rating
          "sorting": params.sorting == "rating"
              ? "highest_rating"
              : params.sorting == "new"
                ? "latest_location"
                : params.sorting == "az"
                  ? "az"
                  : params.sorting == "za"
                    ? "za"
                    : params.sorting == "comment"
                      ? "most_comment"
                      : "highest_rating",

          ...params.searchString && { "search_string": params.searchString },

          ...params.ids && { "related_stores": params.ids },

          ...params.filter?.districts.length > 0 && { "regions": getFilterString(params.filter.districts) },
          ...params.filter?.petTypes.length > 0 && { "pets": getFilterString(params.filter.petTypes) },
          ...params.filter?.needTypes.length > 0 && { "cats": getFilterString(params.filter.needTypes) },

          // direct search
          ...params.regions?.length > 0 && { "regions": getFilterString(params.regions) },
          ...params.pets?.length > 0 && { "pets": getFilterString(params.pets) },
          ...params.cats?.length > 0 && { "cats": getFilterString(params.cats) },

          ...params.location && { "sorting": "distance" },

          ...page && { "page": page }
        }
      }
    );
    // console.log(data.payload);
    return {
      isSuccess: true,
      result: data.payload.data,
      nextPage: data.payload.current_page < data.payload.last_page ? (data.payload.current_page + 1) : null
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getShopQuickSearchResultApi(params?: any) {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : {
          ...params.searchString && { "search_string": params.searchString },
        }
      }
    );
    console.log(data.payload);
    return {
      isSuccess: true,
      result: data.payload.data,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

const getFilterString = (filters: number[]) => {
  return filters.reduce(
    (prev, current, index) => {
      return prev + (index == 0 ? "" : ",") + current
    }, 
    ""
  );
}

export async function getRatingPicksApi() {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : { "sorting": "highest_rating" }
      }
    );
    return {
      isSuccess: true,
      result: data.payload.data.slice(0, 5),
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getCommentsPicksApi() {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : { "sorting": "most_comment" }
      }
    );
    return {
      isSuccess: true,
      result: data.payload.data.slice(0, 5),
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}
