import EditModal from './EditModal';
import { connect } from 'react-redux';
import office_actions from '../redux/office/actions';


const mapStateToProps = state => ({
  offices: state.office.offices,
  officeState: state.office,
})

const mapDispatchToProps = dispatch => ({
  getOfficeList: (payload) => dispatch(office_actions.getOfficeList(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
