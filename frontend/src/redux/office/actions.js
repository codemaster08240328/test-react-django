const actions = {
  GET_OFFICE_LIST: "GET_OFFICE_LIST",
  GET_SUCCESS: "OFFICE_LIST_GET_SUCCESS",
  GET_ERROR: "OFFICE_LIST_GET_ERROR",
  getOfficeList: (payload) => ({
    type: actions.GET_OFFICE_LIST,
    payload
  }),
}

export default actions
