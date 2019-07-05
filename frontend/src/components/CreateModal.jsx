import React, { Component } from 'react';
import { Modal, Input, InputNumber, Button, Checkbox, Table, Tag } from 'antd';
import _ from 'lodash';
import axios from 'axios';

import { api_endpoints } from '../helpers/constants'


class CreateModal extends Component {
  state = {
    office_name:'',
    street: '',
    city: '',
    postal_code: '',
    monthly_rent: '',
    company_name: '',
    headquarter: false,
    offices: []
  }

  handleAdd = () => {
    const { office_name, street, city, postal_code, monthly_rent, headquarter } = this.state
    this.setState({
      offices: [...this.state.offices, {
        key: (this.state.offices.length + 1).toString(),
        name: office_name,
        street,
        city,
        postal_code,
        monthly_rent,
        headquarter
      }]
    },()=>{
      console.log(this.state.offices)

      this.setState({
        office_name: '',
        street: '',
        city: '',
        postal_code: '',
        monthly_rent: '',
        headquarter: false
      })
    })
  }

  columns = [
    {
      title: 'Office Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      render: text => <span>{text}</span>
    },
    {
      title: 'Other',
      dataIndex: 'tag',
      key: 'headquarter',
      render: (value, record) => {
        if (record.headquarter) {
          return (
            <Tag color="green" >
              Headquarter
            </Tag>
          )
        }

      },
    }
  ]

  handleCancel = () => {
    this.setState({
      offices: []
    }, () => {
      this.props.onCancel()
    })
  }

  handleOk = async () => {
    const { company_name, offices } = this.state
    const { onSave } = this.props
    await axios.post(api_endpoints.CREATE_COMPANY_OFFICE, {
      name: company_name,
      offices
    })
    onSave()
  }

  render() {
    const { ...props } = this.props
    const { office_name, city, street, postal_code, monthly_rent, headquarter, offices } = this.state
    return (
      <Modal
        {...props}
        onCancel={() => this.handleCancel()}
        onOk={() => this.handleOk()}
      >
        <p>
          <b>Company Name:</b>  <br/>
          <Input placeholder='Company Name' onChange={({ target: { value: company_name } }) => this.setState({ company_name })} />
        </p>
        <b>Headquarter:</b>
        <div style={{display: "flex", justifyContent: 'space-around', marginTop: 5}}>
          <Input style={{ width: "45%" }} placeholder='Office Name' value={ office_name } onChange={({target: { value: office_name }}) => this.setState({ office_name })}/>
          <Input style={{ width: "45%" }} placeholder='Street' value={ street } onChange={({ target: { value: street } }) => this.setState({ street })}/>
        </div>
        <div style={{display: "flex", justifyContent: 'space-around', marginTop: 5}}>
          <Input style={{ width: "45%" }} placeholder='City' value={ city } onChange={({ target: { value: city } }) => this.setState({ city })}/>
          <Input style={{ width: "45%" }} placeholder='Postal Code' value={ postal_code }  onChange={({ target: { value: postal_code } }) => this.setState({ postal_code })}/>
        </div>
        <div style={{display: "flex", justifyContent: 'space-around', marginTop: 5}}>
          <InputNumber min={0} style={{ width: "45%" }} value={ monthly_rent }  placeholder='Monthly Rent (Example Value: 1.22)' onChange={(monthly_rent) => this.setState({ monthly_rent })}/>
          <div style={{ width: "45%", justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} >
            Headquarter:
            <Checkbox onChange={({ target: { checked: headquarter } }) => this.setState({ headquarter })} checked={ headquarter } disabled={!!offices.find(office => office.headquarter)}/>
            <Button type="primary" onClick={this.handleAdd} >Add</Button>
          </div>
        </div>
        <div style={{marginTop: 10}}>
          {!!offices.length && <Table columns={this.columns} dataSource={offices} />}
        </div>
      </Modal>
    )
  }
}

export default CreateModal
