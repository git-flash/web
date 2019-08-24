import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Popover } from 'antd'

import Loader from '../../common/loader'

const fetchAuditSubscription = gql`
  subscription($id: uuid!) {
    audit_by_pk(id: $id) {
      id
      audits
    }
  }
`

const LinkDetails = props => {
  const columns = [
    {
      title: (
        <Popover
          title="First Contentful Paint"
          content="First Contentful Paint marks the time at which the first text or image is painted"
        >
          <span className="text-xs uppercase text-gray-700">FCP</span>
        </Popover>
      ),
      dataIndex: 'firstContentfulPaint',
      key: 'firstContentfulPaint',
      width: '10%',
      render: (_, record) => (
        <span className="text-sm">
          {record['first-contentful-paint'].displayValue}
        </span>
      ),
    },
    {
      title: (
        <Popover
          title="First Meaningful Paint"
          content="First Meaningful Paint measures when the primary content of a page is visible"
        >
          <span className="text-xs uppercase text-gray-700">FMP</span>
        </Popover>
      ),
      dataIndex: 'firstMeaningfulPaint',
      key: 'firstMeaningfulPaint',
      width: '10%',
      render: (_, record) => (
        <span className="text-sm">
          {record['first-meaningful-paint'].displayValue}
        </span>
      ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">Speed index</span>
      ),
      dataIndex: 'speedIndex',
      key: 'speedIndex',
      width: '10%',
      render: (_, record) => (
        <span className="text-sm">{record['speed-index'].displayValue}</span>
      ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">
          Screenshot thumbnails
        </span>
      ),
      dataIndex: 'screenshotThumbnails',
      key: 'screenshotThumbnails',
      width: '40%',
      render: (_, record) => (
        <span className="flex">
          {record['screenshot-thumbnails'].details &&
            record['screenshot-thumbnails'].details.items.map(
              (image, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <Popover
                      content={
                        <img
                          src={image.data}
                          className="shadow-md"
                          width="100%"
                        />
                      }
                      title={
                        <div className="text-base text-gray-700 text-center">
                          {image.timing} ms
                        </div>
                      }
                    >
                      <img
                        src={image.data}
                        className="mr-4 shadow-md"
                        width="40"
                      />
                    </Popover>
                  </div>
                )
              }
            )}
        </span>
      ),
    },
  ]

  const { data, loading, error } = useSubscription(fetchAuditSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { id, audits } = data.audit_by_pk

  return (
    <div className="bg-white rounded">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={[audits]}
        pagination={false}
        bordered
      />
    </div>
  )
}

export default withApollo(LinkDetails)
