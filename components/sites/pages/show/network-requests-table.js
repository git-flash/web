import React, { Fragment, useEffect } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import Table from 'antd/lib/table'
import Popover from 'antd/lib/popover'
import PageHeader from 'antd/lib/page-header'
import Tabs from 'antd/lib/tabs'
import Icon from 'antd/lib/icon'
import Tag from 'antd/lib/tag'
import Router from 'next/router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dynamic from 'next/dynamic'

import Loader from '../../../common/loader'
import chartConfig from '../../../../public/static/configs/chart.json'
import calculateFileSize from '../../../../lib/calculate-file-size'

dayjs.extend(customParseFormat)

const fetchNetworkRequestsSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      audits(limit: 1, order_by: { fetch_time: desc }) {
        id
        audit_network_requests_details
        fetch_time
      }
    }
  }
`

const NetworkRequestsTable = props => {
  const columns = [
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">URL</span>
      ),
      dataIndex: 'url',
      key: 'url',
      width: 750,
      fixed: 'left',
      render: (_, record) => (
        <div className="text-sm font-semibold w-full">{record.url}</div>
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
      render: (_, record) => <Tag color="blue">{record.statusCode}</Tag>,
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
    fetchNetworkRequestsSubscription,
    {
      variables: { id: props.id },
      fetchPolicy: 'network-only',
    }
  )

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  return (
    <Fragment>
      <h2 className="uppercase text-lg text-gray-900 m-6">Network Requests</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={
          !!page_by_pk.id && !!page_by_pk.audits[0]
            ? page_by_pk.audits[0].audit_network_requests_details.items.reverse()
            : []
        }
        pagination={false}
        scroll={{ x: 2150, y: 400 }}
        className="border-0 border-t border-solid border-gray-300"
      />
    </Fragment>
  )
}

export default withApollo(NetworkRequestsTable)
