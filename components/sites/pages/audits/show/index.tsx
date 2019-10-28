import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { PageHeader, Icon, Row, Col } from 'antd'
import Router from 'next/router'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import truncate from 'lodash/truncate'

import Loader from '../../../../common/loader'
import NetworkRequestsTable from './network-requests-table'
import calculateProgress from '../../../../../lib/calculate-progress'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchAuditsSubscription = gql`
  subscription($id: uuid!) {
    audit_by_pk(id: $id) {
      id
      categories_performance_score
      audit_first_contentful_paint_display_value
      audit_speed_index_display_value
      audit_first_meaningful_paint_display_value
      audit_first_cpu_idle_display_value
      page {
        id
        link
      }
    }
  }
`

const AuditDetails = (props: any) => {
  const { data, loading, error } = useSubscription(fetchAuditsSubscription, {
    variables: { id: props.auditId },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { audit_by_pk } = data

  return (
    <Fragment>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
        <PageHeader
          onBack={() =>
            Router.push(
              `/sites/[siteId]/pages/[pageId]?pageId=${props.pageId}&siteId=${props.siteId}`,
              `/sites/${props.siteId}/pages/${props.pageId}`
            )
          }
          title={
            <div style={{ margin: '12px 0 0 12px' }} className="text-base">
              {truncate(audit_by_pk.page.link, {
                length: 200,
                separator: '...',
              })}
            </div>
          }
          backIcon={
            <div style={{ margin: '12px -12px 0 12px' }}>
              <Icon type="arrow-left" />
            </div>
          }
        />
      </div>
      <div className="m-8 rounded border border-b-0 border-solid border-gray-300 shadow bg-white">
        <h2 className="uppercase text-lg text-gray-900 m-6">
          Overall Performance Score
          <span className="ml-4 p-2 rounded-full bg-gray-100 border border-solid border-gray-300">
            {calculateProgress(audit_by_pk.categories_performance_score)}
          </span>
        </h2>
        <div className="flex">
          <div
            className="bg-blue-700 p-2 rounded-bl"
            style={{
              width: `${audit_by_pk.categories_performance_score * 100}%`,
            }}
          />
          <div
            className="bg-gray-100 p-2 rounded-br"
            style={{
              width: `${100 - audit_by_pk.categories_performance_score * 100}%`,
            }}
          />
        </div>
      </div>
      <Row gutter={24} className="mx-5 mb-8">
        <Col span={6}>
          <div className="bg-white p-4 border border-solid rounded border-gray-300 shadow text-center">
            <div className="text-4xl text-black font-bold mb-2">
              {audit_by_pk.audit_first_contentful_paint_display_value}
            </div>
            <div className="text-gray-600 text-base">
              First Contentful Paint
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white p-4 border border-solid rounded border-gray-300 shadow text-center">
            <div className="text-4xl text-black font-bold mb-2">
              {audit_by_pk.audit_first_meaningful_paint_display_value}
            </div>
            <div className="text-gray-600 text-base">
              First Meaningful Paint
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white p-4 border border-solid rounded border-gray-300 shadow text-center">
            <div className="text-4xl text-black font-bold mb-2">
              {audit_by_pk.audit_speed_index_display_value}
            </div>
            <div className="text-gray-600 text-base">Speed Index</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white p-4 border border-solid rounded border-gray-300 shadow text-center">
            <div className="text-4xl text-black font-bold mb-2">
              {audit_by_pk.audit_first_cpu_idle_display_value}
            </div>
            <div className="text-gray-600 text-base">First CPU Idle</div>
          </div>
        </Col>
      </Row>
      <div className="bg-white rounded border border-b-0 border-solid border-gray-300 shadow m-8">
        <NetworkRequestsTable id={props.auditId} />
      </div>
    </Fragment>
  )
}

export default withApollo(AuditDetails)
