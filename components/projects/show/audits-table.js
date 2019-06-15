import React, { Component, Fragment } from 'react'
import { Table, Drawer } from 'antd'
import toArray from 'lodash/toArray'

import CategoriesTable from './categories-table'

class AuditsTable extends Component {
  state = {
    visible: false,
    selectedItemId: '',
    categories: [],
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, records) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: records.id,
              categories: toArray(records.categories),
            })
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Lighthouse Version',
      dataIndex: 'lighthouseVersion',
      key: 'lighthouseVersion',
      render: (text, records) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: records.id,
              categories: toArray(records.categories),
            })
          }
        >
          {text}
        </a>
      ),
    },
  ]

  showDrawer = ({ id, categories }) => {
    this.setState({
      visible: true,
      selectedItemId: id,
      categories,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
      selectedItemId: '',
      categories: [],
    })
  }

  drawerNode = () => {
    return (
      <Drawer
        width={1000}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        title="Categories"
      >
        <CategoriesTable categories={this.state.categories} />
      </Drawer>
    )
  }

  render() {
    const { audits } = this.props

    return (
      <Fragment>
        {this.drawerNode()}
        <Table rowKey="id" columns={this.columns} dataSource={audits} />
      </Fragment>
    )
  }
}

export default AuditsTable
