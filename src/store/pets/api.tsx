import api from '@/api';
import moment from 'moment';

export async function getPetProfileApi(id: number) {
  try {
    const { data } = await api.get('/user/profile/pet/' + id);
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

export async function updatePetProfileApi(params: any) {
  try {
    var body = new FormData();
    params.name && body.append('name', params.name);
    params.petType && body.append('pet_type_id', params.petType);
    params.petBreed && body.append('pet_breed', params.petBreed);
    params.birthday && body.append('dob', moment(params.birthday).format("YYYY-MM-DD"));
    params.gender && body.append('gender', params.gender);
    params.sterilizeStatus && body.append('sterilisation_status', params.sterilizeStatus);
    params.chipNumber && body.append('chip_number', params.chipNumber);
  
    const { data } = await api.post('/user/profile/pets/', body);
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

export async function getPetProfileOverviewApi(id: number) {
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
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
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function addPetProfileHealthRecordApi(id: number, name: string, date: Date, validUntil: Date) {
  var body = new FormData();
  body.append('vaccine_name', name);
  body.append('date', moment(date).format("YYYY-MM-DD"));
  body.append('valid_until', moment(validUntil).format("YYYY-MM-DD"));

  try {
    const { data } = await api.post('/user/profile/pet/' + id + '/healthRecord', body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
    }
  }
}

export async function getPetProfilePetInsuranceApi(id: number) {
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
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function editPetProfilePetInsurancedApi(id: number, name: string, startDate: Date, endDate: Date, insuranceId? :number) {
  var body = new FormData();
  body.append('insurancer_id', name);
  body.append('start_date', moment(startDate).format("YYYY-MM-DD"));
  body.append('end_date', moment(endDate).format("YYYY-MM-DD"));

  try {
    const { data } = await api.post('/user/profile/pet/' + id + '/insurance' + (insuranceId ? `/${insuranceId}` : ''), body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
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
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function updatePetProfileGroomingApi(params: any) {
  try {
    var body = new FormData();
    params.time && body.append('datetime', moment(params.time).format("YYYY-MM-DD hh:mm"));
    params.company && body.append('business_unit_id', params.company);
    params.groomer && body.append('groomer', params.groomer);
    params.service && body.append('booked_service', params.service);
    params.remarks && body.append('remarks', params.remarks);
    params.priceType && body.append('price_type', params.priceType);
    params.price && body.append('price', params.price);
  
    const { data } = await api.post('/user/profile/pet/' + params.petId + '/groomingSchedules' + (params.itemId ? `/${params.itemId}` : ''), body);
    return {
      isSuccess: data.code == 0,
    }
  } catch (error: any) {
    return {
      isSuccess: false,
    }
  }
}




