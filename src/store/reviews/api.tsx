import api from '@/api';

export async function getReviewsByIdApi(id: number, page: number) {
  try {
    const { data } = await api.get('/reviews/bu/' + id, { params: { page } });
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
