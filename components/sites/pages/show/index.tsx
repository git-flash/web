import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import PageHeader from 'antd/lib/page-header'
import Icon from 'antd/lib/icon'
import Router from 'next/router'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import truncate from 'lodash/truncate'

import Loader from '../../../common/loader'
import PerformanceChart from './performance-chart'
import NetworkRequestsTable from './network-requests-table'
import DetailsSummary from './details-summary'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchPagesSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      link
      audits(limit: 1, order_by: { fetch_time: desc }) {
        id
        fetch_time
      }
    }
  }
`

const PageDetails = (props: any) => {
  const { data, loading, error } = useSubscription(fetchPagesSubscription, {
    variables: { id: props.pageId },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  return (
    <>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
        <PageHeader
          onBack={() =>
            Router.push(
              `/sites/[siteId]?id=${props.siteId}`,
              `/sites/${props.siteId}`
            )
          }
          title={
            <div style={{ margin: '12px 0 0 12px' }} className="text-base">
              {truncate(page_by_pk.link, {
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
      <div className="bg-white rounded border border-b-0 border-solid border-gray-300 shadow m-8">
        <h2 className="uppercase text-lg text-gray-900 m-6">Performance</h2>
        <PerformanceChart id={props.pageId} />
      </div>
      <div className="m-8">
        <DetailsSummary id={props.pageId} />
      </div>
      <div className="bg-white rounded border border-b-0 border-solid border-gray-300 shadow m-8">
        <NetworkRequestsTable id={props.pageId} />
      </div>
    </>
  )
}

export default withApollo(PageDetails)
