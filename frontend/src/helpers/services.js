import axios from 'axios';
import { api_endpoints } from './constants';

const getCompanyList = async() => {
  const result = await axios.get(api_endpoints.GET_COMPANY_LIST);
  return handleResponse(result);
}

const getOfficeList = async({company_name}) => {
  const result = await axios.get(api_endpoints.GET_OFFICE_LIST.replace(':company_name', company_name));
  return handleResponse(result);
}

const handleResponse = (result) => {
  if (result.status > 400){
    return {
      error: true,
      message: 'Error occured while backend api calling...'
    }
  } else {
    return result;
  }
}

export {
  getCompanyList,
  getOfficeList,
}
