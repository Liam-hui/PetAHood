import api from '@/api';

export async function getShopDetailByIdApi(id: number) {
  let shopDetail: Object[] | null = null;
  try {
    const { data } = await api.get('/bu/' + id);
    shopDetail = data.payload;
  } catch (error) {
    console.log(error);
  }
  return shopDetail;
}

