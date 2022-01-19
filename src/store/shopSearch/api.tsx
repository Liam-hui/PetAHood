import api from '@/api';

export async function getShopSearchResultApi(params?: any, page?: number) {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : {
          ...params.searchString && { "search_string": params.searchString },
          ...params.filter?.region.length > 0 && { "regions": getFilterString(params.filter.region) },
          ...params.filter?.petType.length > 0 && { "pets": getFilterString(params.filter.petType) },
          ...params.filter?.serviceType.length > 0 && { "cats": getFilterString(params.filter.serviceType) },
          ...params.filter?.special.length > 0 && { "others": getFilterString(params.filter.special) },
          ...page && { "page": page }
        }
      }
    );
    console.log(data.payload);
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

const getFilterString = (filters: number[]) => {
  return filters.reduce(
    (prev, current, index) => {
      return prev + (index == 0 ? "" : ",") + current
    }, 
    ""
  );
}
