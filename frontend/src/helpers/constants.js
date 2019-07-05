const api_endpoints = {
  GET_COMPANY_LIST: '/company',
  GET_OFFICE_LIST: '/office/?company=:company_name',
  UPDATE_HEADQUATER: '/company/:company_id/',
  CREATE_COMPANY_OFFICE: '/add_company/'
}

export {
  api_endpoints,
}
