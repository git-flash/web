import React, { Component } from 'react'
import { Table } from 'antd'

class CategoriesTable extends Component {
  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ]

  render() {
    const { categories } = this.props

    return <Table rowKey="id" columns={this.columns} dataSource={categories} />
  }
}

export default CategoriesTable
