import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Popover, PageHeader } from 'antd'
import Router from 'next/router'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import Loader from '../../../common/loader'
import calculateProgress from '../../../../lib/calculate-progress'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchPagesSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      link
      audits(limit: 1, order_by: { fetch_time: desc }) {
        id
        audit_first_contentful_paint_display_value
        audit_first_meaningful_paint_display_value
        categories_pwa_score
        categories_best_practices_score
        categories_seo_score
        categories_performance_score
        fetch_time
      }
    }
  }
`

const PageDetails = (props: any) => {
  const columns: any = [
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
      width: 200,
      render: (
        _: string,
        record: {
          audit_first_contentful_paint_display_value: string
        }
      ) => (
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
      width: 200,
      render: (
        _: string,
        record: {
          audit_first_meaningful_paint_display_value: string
        }
      ) => (
        <span className="text-sm">
          {record.audit_first_meaningful_paint_display_value}
        </span>
      ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">PWA Score</span>,
      dataIndex: 'pwaScore',
      key: 'pwaScore',
      width: 200,
      render: (
        _: string,
        record: {
          categories_pwa_score: number
        }
      ) => calculateProgress(record.categories_pwa_score),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">
          Best Practices Score
        </span>
      ),
      dataIndex: 'bestPracticesScore',
      key: 'bestPracticesScore',
      width: 200,
      render: (
        _: string,
        record: {
          categories_best_practices_score: number
        }
      ) => calculateProgress(record.categories_best_practices_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">SEO Score</span>,
      dataIndex: 'seoScore',
      key: 'seoScore',
      width: 200,
      render: (
        _: string,
        record: {
          categories_seo_score: number
        }
      ) => calculateProgress(record.categories_seo_score),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">
          Performance Score
        </span>
      ),
      dataIndex: 'performanceScore',
      key: 'performanceScore',
      width: 200,
      render: (
        _: string,
        record: {
          categories_performance_score: number
        }
      ) => calculateProgress(record.categories_performance_score),
    },
  ]

  const { data, loading, error } = useSubscription(fetchPagesSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  return (
    <>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        <PageHeader
          onBack={() =>
            Router.push(
              `/sites/show?id=${props.siteId}`,
              `/sites/${props.siteId}`
            )
          }
          title={`Audits for ${page_by_pk.link}`}
        >
          <p className="text-xs text-gray-500 font-hairline mb-0">
            {!!page_by_pk.audits.length
              ? `Last audit was ${dayjs(
                  page_by_pk.audits[0].created_at
                ).fromNow()}`
              : 'Page will be audited soon'}
          </p>
        </PageHeader>
      </div>
      <div className="p-8">
        <div className="bg-white rounded mx-auto border border-b-0 border-solid border-gray-300 shadow-lg">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={!!page_by_pk.id ? page_by_pk.audits : []}
            pagination={false}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    </>
  )
}

export default withApollo(PageDetails)
