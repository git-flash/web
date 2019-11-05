import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo'
import Table from 'antd/lib/table'
import Tag from 'antd/lib/tag'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import Loader from '../../../common/loader'
import calculateFileSize from '../../../../lib/calculate-file-size'

dayjs.extend(customParseFormat)

interface IProps {
  id: string
}

const FETCH_NETWORK_REQUESTS_SUBSCRIPTION = gql`
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

const NetworkRequestsTable: React.SFC<IProps> = (props: any) => {
  const columns: any = [
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">URL</span>
      ),
      dataIndex: 'url',
      key: 'url',
      width: 500,
      fixed: 'left',
      render: (_: any, record: any) => (
        <div className="text-sm font-semibold w-full break-all">
          {record.url}
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
      render: (_: any, record: any) => calculateFileSize(record.resourceSize),
      sorter: (a: any, b: any) => a.resourceSize - b.resourceSize,
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
      render: (_: any, record: any) => `${Math.round(record.startTime)} ms`,
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
      render: (_: any, record: any) => `${Math.round(record.endTime)} ms`,
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
      render: (_: any, record: any) => calculateFileSize(record.transferSize),
      sorter: (a: any, b: any) => a.transferSize - b.transferSize,
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
      render: (_: any, record: any) => (
        <Tag color="blue">{record.statusCode}</Tag>
      ),
      sorter: (a: any, b: any) => a.statusCode - b.statusCode,
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
    FETCH_NETWORK_REQUESTS_SUBSCRIPTION,
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
        scroll={{ x: 1900, y: 400 }}
        className="border-0 border-t border-solid border-gray-300"
      />
    </Fragment>
  )
}

export default NetworkRequestsTable
