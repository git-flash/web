import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Popover, PageHeader, Tabs, Icon } from 'antd'
import Router from 'next/router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import truncate from 'lodash/truncate'
import dynamic from 'next/dynamic'

import Loader from '../../../common/loader'
import chartConfig from '../../../../static/configs/chart.json'
import calculateFileSize from '../../../../lib/calculate-file-size'

dayjs.extend(customParseFormat)

const fetchBestPracticesSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      audits(limit: 1, order_by: { fetch_time: asc }) {
        id
        audit_network_requests_details
        fetch_time
      }
    }
  }
`

const BestPracticesChart = props => {
  const columns = [
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">URL</span>
      ),
      dataIndex: 'url',
      key: 'url',
      width: 600,
      fixed: 'left',
      render: (_, record) => (
        <div className="text-sm font-semibold">
          {truncate(record.url, { length: 60, separator: '...' })}
        </div>
      ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Resource Size
        </span>
      ),
      dataIndex: 'resourceSize',
      key: 'resourceSize',
      width: 200,
      render: (_, record) => calculateFileSize(record.resourceSize),
      sorter: (a, b) => a.resourceSize - b.resourceSize,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Start Time
        </span>
      ),
      dataIndex: 'startTime',
      key: 'startTime',
      width: 200,
      render: (_, record) => `${Math.round(record.startTime)} ms`,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          End Time
        </span>
      ),
      dataIndex: 'endTime',
      key: 'endTime',
      width: 200,
      render: (_, record) => `${Math.round(record.endTime)} ms`,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Transfer Size
        </span>
      ),
      dataIndex: 'transferSize',
      key: 'transferSize',
      width: 200,
      render: (_, record) => calculateFileSize(record.transferSize),
      sorter: (a, b) => a.transferSize - b.transferSize,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Status Code
        </span>
      ),
      dataIndex: 'statusCode',
      key: 'statusCode',
      width: 200,
      sorter: (a, b) => a.statusCode - b.statusCode,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          MIME Type
        </span>
      ),
      dataIndex: 'mimeType',
      key: 'mimeType',
      width: 200,
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Resource Type
        </span>
      ),
      dataIndex: 'resourceType',
      key: 'resourceType',
      width: 200,
    },
  ]

  const { data, loading, error } = useSubscription(
    fetchBestPracticesSubscription,
    {
      variables: { id: props.id },
      fetchPolicy: 'network-only',
    }
  )

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={
        !!page_by_pk.id
          ? page_by_pk.audits[0].audit_network_requests_details.items
          : []
      }
      pagination={false}
      scroll={{ x: 2000, y: 400 }}
    />
  )
}

export default withApollo(BestPracticesChart)
