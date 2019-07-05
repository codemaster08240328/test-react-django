import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Spin, Button, Tag } from 'antd';

import EditModal from '../components/edit_modal';
import CreateModal from '../components/CreateModal';

class MainPage extends Component {
  static propTypes = {
    companies: PropTypes.array,
    companyState: PropTypes.object,
    offices: PropTypes.array,
    officeState: PropTypes.object,
    getCompanyList: PropTypes.func,
    getOfficeList: PropTypes.func
  }

  state = {
    company: '',
    companyId: '',
    companyName: '',
    editModal: false,
    createModal: false
  }

  company_columns = [
    {
      title: 'Company Name',
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
      title: 'Postal Code',
      dataIndex: 'postal_code',
      key: 'postal_code',
      render: text => <span>{text}</span>
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: text => <span>{text}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="dashed" onClick={() => this.openEditModal(record.id, record.name)}>
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="dashed" onClick={() => this.officeList(record.name)}>
            Office List
          </Button>
          <Divider type="vertical" />
          <Button type="danger" disabled >
            Delete
          </Button>
        </span>
      )
    },
  ]

  office_columns = [
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
      title: 'Postal Code',
      dataIndex: 'postal_code',
      key: 'postal_code',
      render: text => <span>{text}</span>
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: text => <span>{text}</span>
    },
    {
      title: 'Monthly Rent',
      dataIndex: 'monthly_rent',
      key: 'monthly_rent',
      render: text => <span>{text}</span>
    },
    {
      title: 'Other',
      dataIndex: 'tag',
      key: 'headquarter',
      render: (value, record) => {
        if (record.headquarter) {
          return(
            <Tag color="green" >
              Headquarter
            </Tag>
          )
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" disabled >
            Delete
          </Button>
        </span>
      )
    },
  ]


  componentDidMount(){
    const { getCompanyList } = this.props
    getCompanyList()
  }

  getCompanyData = data => {
    return data.map(({id, name, headquarter_office}, index) => ({
      id: id,
      key: index.toString(),
      name: name,
      street: headquarter_office.street,
      postal_code: headquarter_office.postal_code,
      city: headquarter_office.city
    }))
  }

  officeList = company_name => {
    const { getOfficeList } = this.props
    this.setState({
      company: company_name
    })
    getOfficeList({company_name})
  }

  openEditModal = (companyId, companyName) => {
    this.officeList(companyName)
    this.setState({
      editModal: true,
      companyId,
      companyName
    })
  }

  handleCancel = () => {
    this.setState({
      editModal: false,
      createModal: false
    })
  }

  handleSave = (type) => {
    const { getOfficeList, getCompanyList } = this.props

    this.setState({
      editModal: false,
      createModal: false
    })
    getCompanyList()
    if(type === 'edit') getOfficeList({ company_name: this.state.companyName })
  }



  render(){
    const { companyState, companies, officeState, offices } = this.props
    const { company, companyId, editModal, companyName, createModal } = this.state
    const data = companies.length === 0 ? companies : this.getCompanyData(companies);
    return(
      <div className="container">
        <div className="company_header">
          <h2>Company List</h2>
          <Button type="primary" onClick={() => this.setState({createModal: true})}>Add</Button>
        </div>
        <div>
          {companyState.loading && <Spin />}
          {companyState.success && <Table columns={this.company_columns} dataSource={data} />}
        </div>
        {
          company &&
          <div className="office_header">
            <h2>Offices of {this.state.company} Company</h2>
          </div>
        }
        {
          company &&
          <div>
            {officeState.loading && <Spin />}
            {officeState.success && <Table columns={this.office_columns} dataSource={offices.map(office => ({...office, key: office.id.toString()}))} />}
          </div>
        }
        <EditModal
          title = "Change Headquarter"
          visible={editModal}
          onSave={() => this.handleSave('edit')}
          onCancel={this.handleCancel}
          companyId={companyId}
          companyName={companyName}
        />

        <CreateModal
          title = "Create Company"
          visible={createModal}
          onSave={() => this.handleSave('create')}
          onCancel={this.handleCancel}
          companyId={companyId}
          companyName={companyName}
        />
      </div>
    )
  }
}

export default MainPage
