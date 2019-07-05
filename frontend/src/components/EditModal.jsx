import React, { Component } from 'react';
import { Modal, Select } from 'antd';
import _ from 'lodash';
import axios from 'axios';

import { api_endpoints } from '../helpers/constants'

const { Option } = Select;

class EditModal extends Component {

  state = {
    headquarterId: 1
  }

  componentDidUpdate(prevProps) {
    const { offices } = this.props;

    if (!_.isEqual(offices, prevProps.offices) && !!offices.length) {
      this.setState({
        headquarterId: !!offices.find(office => office.headquarter) ? offices.find(office => office.headquarter).id : offices[0].id
      });
    }
  }

  onSelectChange = value => {
    this.setState({headquarterId: value})
  }

  handleSave = async () => {
    const { headquarterId } = this.state
    const { companyId, companyName, onSave } = this.props
    await axios.put(api_endpoints.UPDATE_HEADQUATER.replace(':company_id', companyId), {
      office_id: headquarterId
    })
    onSave()
  }

  render(){
    const { headquarterId } = this.state;
    const { companyId, companyName, offices, ...props } = this.props
    return(
      <Modal
        {...props}
        onOk={this.handleSave}
      >
        <p>
          <b>Company Name:</b>  { companyName }
        </p>
        <b>Headquarter:</b>
        <br/>
        <Select
          value={headquarterId}
          onChange={this.onSelectChange}
          style={{width: "80%"}} >
          {
            offices.map(office => {
              return(
                <Option value={office.id} key={office.id.toString()}>
                  {office.name}
                </Option>
              )
            })
          }
        </Select>
      </Modal>
    )
  }
}

export default EditModal
