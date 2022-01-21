import api from '@/api';

export async function getHomePageButtonsApi() {
  try {
    const { data } = await api.get('/resources/home/app_btns');
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

export async function getHomePageBannersApi() {
  try {
    const { data } = await api.get('/resources/home/banners');
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

export async function getHomePageSlidersApi() {
  try {
    const { data } = await api.get('/resources/home/sliders');
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

export async function getHomePageBlogsApi() {
  try {
    const { data } = await api.get('/resources/home/blogs');
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
