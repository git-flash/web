import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Popover } from 'antd'

import Loader from '../../common/loader'

const fetchAuditSubscription = gql`
  subscription($id: uuid!) {
    audit_by_pk(id: $id) {
      id
      audit_first_contentful_paint_display_value
      audit_first_meaningful_paint_display_value
      audit_speed_index_display_value
      audit_screenshot_thumbnails
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
          {record.audit_first_contentful_paint_display_value}
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
          {record.audit_first_meaningful_paint_display_value}
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
        <span className="text-sm">
          {record.audit_speed_index_display_value}
        </span>
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
          {record.audit_screenshot_thumbnails
            ? record.audit_screenshot_thumbnails.items.map((image, index) => {
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
                        width="80"
                        height="auto"
                      />
                    </Popover>
                  </div>
                )
              })
            : false}
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

  const { audit_by_pk } = data

  return (
    <div className="bg-white rounded">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={!!audit_by_pk.id ? [audit_by_pk] : []}
        pagination={false}
        bordered
      />
    </div>
  )
}

export default withApollo(LinkDetails)
