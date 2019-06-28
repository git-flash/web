import React from 'react'
import { Table } from 'antd'

const CategoriesTable = ({
  categories,
}: {
  categories: Array<{ title: any; score: any }>
}) => {
  const columns = [
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

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={categories}
      pagination={false}
    />
  )
}

export default CategoriesTable
