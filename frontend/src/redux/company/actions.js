const actions = {
  GET_COMPANY_LIST: "GET_COMPANY_LIST",
  GET_SUCCESS: "COMPANY_LIST_GET_SUCCESS",
  GET_ERROR: "COMPANY_LIST_GET_ERROR",
  getCompanyList: () => ({
    type: actions.GET_COMPANY_LIST
  }),
}

export default actions
