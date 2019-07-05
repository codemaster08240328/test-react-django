import { connect } from 'react-redux';
import company_actions from '../redux/company/actions';
import office_actions from '../redux/office/actions';

import MainPage from './MainPage';
import './main_page.css';
import { stat } from 'fs';

const mapStateToProps = (state) => ({
  companies: state.company.companies,
  companyState: state.company,
  offices: state.office.offices,
  officeState: state.office,
})

const mapDispatchToProps = (dispatch) => ({
  getCompanyList: () => dispatch(company_actions.getCompanyList()),
  getOfficeList: (payload) => dispatch(office_actions.getOfficeList(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
