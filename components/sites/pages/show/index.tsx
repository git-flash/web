import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Popover, PageHeader, Tabs, Icon } from 'antd'
import Router from 'next/router'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import truncate from 'lodash/truncate'

import Loader from '../../../common/loader'
import calculateProgress from '../../../../lib/calculate-progress'
import PerformanceChart from './performance-chart'
import AccessibilityChart from './accessibility-chart'
import BestPracticesChart from './best-practices-chart'
import SEOChart from './seo-chart'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchPagesSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      link
      audits(limit: 1, order_by: { fetch_time: desc }) {
        id
        categories_performance_score
        categories_seo_score
        categories_best_practices_score
        categories_accessibility_score
        categories_pwa_score
        audit_first_contentful_paint_display_value
        audit_first_meaningful_paint_display_value
        fetch_time
      }
    }
  }
`

const PageDetails = (props: any) => {
  const columns: any = [
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
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
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          SEO Score
        </span>
      ),
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
        <span className="text-xs uppercase text-gray-700 font-bold">
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
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Accessibility Score
        </span>
      ),
      dataIndex: 'accessibilityScore',
      key: 'accessibilityScore',
      width: 200,
      render: (
        _: string,
        record: {
          categories_accessibility_score: number
        }
      ) => calculateProgress(record.categories_accessibility_score),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700 font-bold">
          PWA Score
        </span>
      ),
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
        <Popover
          title="First Contentful Paint"
          content="First Contentful Paint marks the time at which the first text or image is painted"
        >
          <span className="text-xs uppercase text-gray-700 font-bold">FCP</span>
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
          <span className="text-xs uppercase text-gray-700 font-bold">FMP</span>
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
  ]

  const { data, loading, error } = useSubscription(fetchPagesSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data
  const { TabPane } = Tabs

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
          title={`Audits for ${truncate(page_by_pk.link, {
            length: 40,
            separator: '...',
          })}`}
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
      <div className="m-8 bg-white rounded border border-b-0 border-solid border-gray-300 shadow-lg">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={!!page_by_pk.id ? page_by_pk.audits : []}
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </div>
      <div className="m-8 bg-white rounded border border-b-0 border-solid border-gray-300 shadow-lg">
        <Tabs
          defaultActiveKey="performance"
          size="large"
          tabBarStyle={{
            backgroundColor: '#fafafa',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          <TabPane
            tab={
              <span className="text-xs uppercase text-gray-700 font-bold px-8">
                <Icon type="thunderbolt" className="text-base" /> Performance
              </span>
            }
            key="performance"
          >
            <div className="pr-2" style={{ minHeight: '400px' }}>
              <PerformanceChart id={props.id} />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="text-xs uppercase text-gray-700 font-bold px-8">
                <Icon type="file-search" className="text-base" /> SEO
              </span>
            }
            key="seo"
          >
            <div className="pr-2" style={{ minHeight: '400px' }}>
              <SEOChart id={props.id} />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="text-xs uppercase text-gray-700 font-bold px-8">
                <Icon type="issues-close" className="text-base" /> Best
                Practices
              </span>
            }
            key="best-practices"
          >
            <div className="pr-2" style={{ minHeight: '400px' }}>
              <BestPracticesChart id={props.id} />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="text-xs uppercase text-gray-700 font-bold px-8">
                <Icon type="property-safety" className="text-base" />{' '}
                Accessibility
              </span>
            }
            key="accessibility"
          >
            <div className="pr-2" style={{ minHeight: '400px' }}>
              <AccessibilityChart id={props.id} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default withApollo(PageDetails)
