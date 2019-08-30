import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Button, Progress, PageHeader, Icon } from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Router from 'next/router'

import Loader from '../../common/loader'
import AddLinkModal from './add-link-modal'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchProjectSubscription = gql`
  subscription($id: uuid!) {
    project_by_pk(id: $id) {
      id
      name
      urls {
        id
        link
        audits(limit: 1, order_by: {fetch_time: desc}) {
          id
          created_at
          categories_accessibility_score
          categories_best_practices_score
          categories_performance_score
          categories_pwa_score
          categories_seo_score
          url {
            link
          }
        }
      }
    }
  }
`

const SitesShow = (props: any) => {
  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Link</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 500,
      fixed: 'left',
      render: (_: string, record: {
        id: string,
        link: string,
        audits: [{
          link: string,
          created_at: string,
        }]
      }) => (
          <>
            <span className="font-base w-full flex">
              <Link
                href={`/sites/links?id=${record.id}&siteId=${props.id}`}
                as={`/sites/${props.id}/links/${record.id}`}
              >
                <a className="font-base w-full flex">{record.link}</a>
              </Link>
            </span>
            {!!record.audits.length
              ? <span className="text-xs text-gray-500 mt-1 flex">
                Last audit was {dayjs(record.audits[0].created_at).fromNow()}
              </span>
              : <span className="text-xs text-gray-500 mt-1 flex">
                Link will be audited soon
              </span>
            }
          </>
        ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Performance</span>,
      dataIndex: 'performance',
      key: 'performance',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_performance_score: number
          }]
        }
      ) => calculateProgress(record, !!record.audits.length && record.audits[0].categories_performance_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">A11Y</span>,
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_accessibility_score: number
          }]
        }
      ) => calculateProgress(record, !!record.audits.length && record.audits[0].categories_accessibility_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_seo_score: number
          }]
        }
      ) => calculateProgress(record, !!record.audits.length && record.audits[0].categories_seo_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Best Practices</span>,
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_best_practices_score: number
          }]
        }
      ) => calculateProgress(record, !!record.audits.length && record.audits[0].categories_best_practices_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_seo_score: number
          }]
        }
      ) => calculateProgress(record, !!record.audits.length && record.audits[0].categories_seo_score),
    },
  ]

  const calculateProgress = (record: any, scoreInFloat: number) => {
    if (!record.audits.length) {
      return (
        <Progress
          type="circle"
          percent={100}
          format={() => <Icon type="hourglass" />}
          width={30}
          strokeWidth={10}
          status="exception"
        />
      )
    }

    const score = Math.round(scoreInFloat * 100)

    if (score <= 49) {
      return (
        <>
          <span className="text-red-700 text-sm">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </>
      )
    } else if (score <= 89) {
      return (
        <>
          <span className="text-blue-700 text-sm">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </>
      )
    } else {
      return (
        <>
          <span className="text-green-700 text-sm">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </>
      )
    }
  }

  const { data, loading, error } = useSubscription(fetchProjectSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { id, name, urls } = data.project_by_pk

  return (
    <>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        <PageHeader
          onBack={() => Router.push('/sites')}
          title={name}
          extra={
            <div className="m-2">
              <AddLinkModal projectId={id} />
              <Link
                href={`/sites/edit?id=${id}`}
                as={`/sites/${id}/edit`}
              >
                <Button type="default" icon="highlight" size="large">
                  Edit Site
                </Button>
              </Link>
            </div>
          }
        >
          <p className="text-gray-600 mb-0">
            Details for {name}
          </p>
        </PageHeader>
      </div>
      <div className="p-8">
        <div className="bg-white rounded mx-auto">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={urls}
            pagination={false}
            bordered
            scroll={{ x: 1300 }}
          />
        </div>


      </div>
    </>
  )
}

export default withApollo(SitesShow)
