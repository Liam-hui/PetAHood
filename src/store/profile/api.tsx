import api from '@/api';

export async function getUserProfileApi() {
  try {
    const { data } = await api.get('/user/profile');
    console.log(data);
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getUserProfileFavApi(params?: any, page?: number) {
  try {
    const { data } = await api.get('/user/profile/favourites/bu', 
      { 
        // headers: {
        //   ...params.location && {
        //     "LatLocation": params.location.lat,
        //     "LngLocation": params.location.long
        //   }
        // },
        params : {

        //   ...params.ids && { "related_stores": params.ids },

        //   ...params.filter?.districts.length > 0 && { "regions": getFilterString(params.filter.districts) },
        //   ...params.filter?.petTypes.length > 0 && { "pets": getFilterString(params.filter.petTypes) },
        //   ...params.filter?.needTypes.length > 0 && { "cats": getFilterString(params.filter.needTypes) },

        //   // direct search
        //   ...params.regions?.length > 0 && { "regions": getFilterString(params.regions) },
        //   ...params.pets?.length > 0 && { "pets": getFilterString(params.pets) },
        //   ...params.cats?.length > 0 && { "cats": getFilterString(params.cats) },

        //   ...params.sorting && { 
        //     "sorting": params.sorting == "rating"
        //       ? "highest_rating"
        //       : params.sorting == "new"
        //         ? "latest_location"
        //         : params.sorting == "az"
        //           ? "az"
        //           : params.sorting == "za"
        //             ? "za"
        //             : params.sorting == "comment"
        //               ? "most_comment"
        //               : params.sorting
        //   },

        //   ...params.location && { "sorting": "distance" },

          ...page && { page }
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

export async function getUserProfileReviewsApi(page?: number) {
  try {
    const { data } = await api.get('/user/profile/reviews', 
      { 
        params : {
          type: "bu",
          ...page && { page }
        }
      }
    );
    console.log(data.payload);
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

export async function getUserProfileFootprintApi() {
  try {
    const { data } = await api.get('/user/profile/footprint');
    console.log(data.payload);
    return {
      isSuccess: true,
      data: data.payload,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getUserProfileVouchersApi(type: string, page?: number) {
  try {
    const { data } = await api.get('/user/profile/vouchers/' + type, 
      { 
        params : {
          ...page && { page }
        }
      }
    );
    console.log(data.payload);
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

export async function getUserProfileOrdersApi(page?: number) {
  try {
    const { data } = await api.get('/user/profile/orders/', 
      { 
        params : {
          ...page && { page }
        }
      }
    );
    console.log(data.payload);
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