import api from '@/api';

export async function getShopDetailByIdApi(id: number) {
  try {
    const { data } = await api.get('/bu/' + id);
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