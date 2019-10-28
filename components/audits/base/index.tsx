import React, { Fragment } from 'react'
import { withApollo, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Table, PageHeader, Icon } from 'antd'
import Link from 'next/link'
import truncate from 'lodash/truncate'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import Router from 'next/router'

import Loader from '../../common/loader'
import calculateProgress from '../../../lib/calculate-progress'

dayjs.extend(LocalizedFormat)

const fetchAuditsSubscription = gql`
  subscription {
    audit(order_by: { created_at: desc }) {
      id
      created_at
      categories_performance_score
      categories_seo_score
      categories_accessibility_score
      page {
        id
        link
        site_id
      }
    }
  }
`

const AuditsIndex = () => {
  const { data, loading, error } = useSubscription(fetchAuditsSubscription)

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { audit } = data

  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700 font-bold">Page</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 500,
      fixed: 'left',
      render: (
        _: string,
        record: {
          id: number
          page: {
            id: number
            site_id: number
            link: string
          }
        }
      ) => (
        <Link
          href={`sites/[siteId]/pages/[pageId]/audits/[auditId]?auditId=${record.id}&siteId=${record.page.site_id}&pageId=${record.page.id}`}
          as={`sites/${record.page.site_id}/pages/${record.page.id}/audits/${record.id}`}
        >
          <a className="font-base w-full flex-col">
            <div className="text-sm font-semibold">
              {truncate(record.page.link, { length: 200, separator: '...' })}
            </div>
            <div className="text-xs mt-1 text-gray-500 font-hairline">
              {record.id}
            </div>
          </a>
        </Link>
      ),
    },
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700 font-bold">
          Audited At
        </span>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 350,
      render: (
        _: string,
        record: {
          created_at: number
        }
      ) => dayjs(record.created_at).format('LLLL'),
    },
    {
      title: () => (
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
      sorter: (
        a: { categories_performance_score: number },
        b: { categories_performance_score: number }
      ) => a.categories_performance_score - b.categories_performance_score,
    },
    {
      title: () => (
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
      sorter: (
        a: { categories_seo_score: number },
        b: { categories_seo_score: number }
      ) => a.categories_seo_score - b.categories_seo_score,
    },
    {
      title: () => (
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
      sorter: (
        a: { categories_accessibility_score: number },
        b: { categories_accessibility_score: number }
      ) => a.categories_accessibility_score - b.categories_accessibility_score,
    },
  ]

  return (
    <Fragment>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
        <PageHeader
          onBack={() => Router.push('/sites')}
          title={
            <div className="text-xl" style={{ margin: '12px 0 0 12px' }}>
              Audits
            </div>
          }
          backIcon={
            <div style={{ margin: '12px -12px 0 12px' }}>
              <Icon type="arrow-left" />
            </div>
          }
        />
      </div>
      <div className="m-8 bg-white rounded border border-b-0 border-solid border-gray-300 shadow">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={audit}
          pagination={false}
          scroll={{ x: 1450 }}
        />
      </div>
    </Fragment>
  )
}

export default withApollo(AuditsIndex)
