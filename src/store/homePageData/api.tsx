import api from '@/api';

export async function getHomePageBannersApi() {
  let banners: Object[] | null = null;
  try {
    const { data } = await api.get('/resources/home/banners');
    banners = data.payload;
  } catch (error) {
    console.log(error);
  }
  return banners;
}

export async function getHomePageSlidersApi() {
  let sliders: Object[] | null = null;
  try {
    const { data } = await api.get('/resources/home/sliders');
    sliders = data.payload;
  } catch (error) {
    console.log(error);
  }
  return sliders;
}

export async function getHomePageBlogsApi() {
  let blogs: Object[] | null = null;
  try {
    const { data } = await api.get('/resources/home/blogs');
    blogs = data.payload;
  } catch (error) {
    console.log(error);
  }
  return blogs;
}

