import api from '@/api';

export async function getBlogDetailsByIdApi(id: number) {
  try {
    const { data } = await api.get('/blog/' + id);
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