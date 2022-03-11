import api from '@/api';
import axios from 'axios';

export async function getPetResourcesApi() {
  try {
    let responses = await axios.all([
      api.get('/resources/pet_types'),
      api.get('/resources/petGenders'),
      api.get('/resources/petBreeds'),
      api.get('/resources/petGroomingBookedService'),
      api.get('/resources/petGroomingPriceType'),
      api.get('/resources/petWeight'),
    ]);
    console.log(responses);
    responses = responses.map(x => x.data.payload);
    const data: any = {
      petTypes: responses[0],
      petGenders: responses[1],
      petBreeds: responses[2],
      petGroomServiceType: responses[3],
      petGroomPriceType: responses[4],
      petWeight: responses[5],
    };
    return {
      isSuccess: true,
      data
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}