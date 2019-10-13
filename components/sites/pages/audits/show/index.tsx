import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { PageHeader, Icon } from 'antd'
import Router from 'next/router'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import truncate from 'lodash/truncate'

import Loader from '../../../../common/loader'
import NetworkRequestsTable from './network-requests-table'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchAuditsSubscription = gql`
  subscription($id: uuid!) {
    audit_by_pk(id: $id) {
      id
      created_at
      categories_performance_score
      page {
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
      <div className="bg-white rounded border border-b-0 border-solid border-gray-300 shadow m-8">
        <NetworkRequestsTable id={props.auditId} />
      </div>
    </Fragment>
  )
}

export default withApollo(AuditDetails)
