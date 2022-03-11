import api from '@/api';
import moment from 'moment';

export async function getPetProfileApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id);
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileApi(params: any) {
  try {
    var body = new FormData();
    if (!params.isDelete) {
      params.name && body.append('name', params.name);
      params.petType && body.append('pet_type_id', params.petType);
      params.petBreed && body.append('pet_breed', params.petBreed);
      params.birthday && body.append('dob', moment(params.birthday).format("YYYY-MM-DD"));
      params.gender && body.append('gender', params.gender);
      params.sterilizeStatus && body.append('sterilisation_status', params.sterilizeStatus);
      params.chipNumber && body.append('chip_number', params.chipNumber);
      params.photo && !params.photo.notUpdated && body.append('image', { uri: params.photo.uri, name: params.photo.fileName, type: params.photo.fileType });
    }
  
    const { data } = await api.post('/user/profile' + (params.id ? `/pet/${params.id}` : '/pets') + (params.isDelete ? '/delete' : ''), body);
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response);
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.message ?? undefined
    }
  }
}

export async function getPetProfileOverviewApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id + '/overview');
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function getPetProfileFashionSizeApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id + '/fashionSize');
    // console.log(data);
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileFashionSizeApi(params: any) {
  var body = new FormData();
  params.size && body.append('size', params.size);
  params.body && body.append('body', params.body);
  params.chest && body.append('chest', params.chest);
  params.neck && body.append('neck', params.neck);

  try {
    const { data } = await api.post('/user/profile/pet/' + params.id + '/fashionSize', body);
    console.log(data);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.message ?? undefined
    }
  }
}

export async function getPetProfileHealthRecordApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id + '/healthRecord');
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileHealthRecordApi(params: any) {
  var body = new FormData();
  if (!params.isDelete) {
    params.image && body.append('image', 
      params.image.notUpdated
        ? params.image.uri
        : { uri: params.image.uri, name: params.image.fileName, type: params.image.fileType }
    );
    params.name && body.append('vaccine_name', params.name);
    params.date && body.append('date', moment(params.date).format("YYYY-MM-DD"));
    params.validUntil && body.append('valid_until', moment(params.validUntil).format("YYYY-MM-DD"));
    params.number && body.append('batch_number', params.number);
  }

  try {
    const { data } = await api.post('/user/profile/pet/' + params.petId + '/healthRecord' + (params.itemId ? `/${params.itemId}` : '') + (params.isDelete ? '/delete' : ''), !params.isDelete && body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    console.log(error.response);
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.message ?? undefined
    }
  }
}

export async function getPetProfileInsuranceApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id + '/insurance');
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileInsuranceApi(params: any) {
  var body = new FormData();
  if (!params.isDelete) {
    params.name && body.append('insurancer_id', params.name);
    params.startDate && body.append('start_date', moment(params.startDate).format("YYYY-MM-DD"));
    params.endDate && body.append('end_date', moment(params.endDate).format("YYYY-MM-DD"));
    params.remindMe != undefined && body.append('reminder_before_30', params.remindMe ? "1" : "0");
  }

  try {
    const { data } = await api.post('/user/profile/pet/' + params.petId + '/insurance' + (params.itemId ? `/${params.itemId}` : '') + (params.isDelete ? '/delete' : ''), !params.isDelete && body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.message ?? undefined
    }
  }
}

export async function getPetProfileGroomingApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id + '/groomingSchedules');
    if (data.code == 0) {
      return {
        isSuccess: true,
        data: data.payload
      }
    }
    else return {
      isSuccess: false,
    }
  } catch (error: any) {
    console.log(error?.response?.data);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileGroomingApi(params: any) {
  try {
    var body = new FormData();
    if (!params.isDelete) {
      params.time && body.append('datetime', moment(params.time).format("YYYY-MM-DD hh:mm"));
      params.company && body.append('business_unit_id', params.company);
      params.groomer && body.append('groomer', params.groomer);
      params.service && body.append('booked_service', params.service);
      params.remarks && body.append('remarks', params.remarks);
      params.priceType && body.append('price_type', params.priceType);
      params.price && body.append('price', params.price);
    }

    const { data } = await api.post('/user/profile/pet/' + params.petId + '/groomingSchedules' + (params.itemId ? `/${params.itemId}` : '') + (params.isDelete ? '/delete' : ''), !params.isDelete && body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.message ?? undefined
    }
  }
}




