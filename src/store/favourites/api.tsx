import api from '@/api';
import { getIdsString, getFilterString } from '@/utils/myUtils';

export async function getFavsApi(params: any, page: number) {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : {
          ...params.ids && { "related_stores": getIdsString(params.ids) },

          ...params.filter?.districts.length > 0 && { "regions": getFilterString(params.filter.districts) },
          ...params.filter?.petTypes.length > 0 && { "pets": getFilterString(params.filter.petTypes) },
          ...params.filter?.needTypes.length > 0 && { "cats": getFilterString(params.filter.needTypes) },

          ...page && { "page": page }
        }
      }
    );
    return {
      isSuccess: true,
      data: data.payload.data,
      nextPage: data.payload.current_page < data.payload.last_page ? (data.payload.current_page + 1) : null
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function userToggleFavApi(id: number) {
  try {
    const { data } = await api.post('/fav/favOrUnfav/bu/' + id);
    return {
      isSuccess: data.code == 0
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}


