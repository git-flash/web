import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Button, Progress, PageHeader, Icon, Empty } from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import Loader from '../../common/loader'
import AddLinkModal from './add-link-modal'
import LinkDetails from './link-details'

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
        audits(limit: 1) {
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

const ProjectsShow = (props: any) => {
  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Link</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: '25%',
      render: (_: string, record: {
        link: string,
        audits: [{
          link: string,
          created_at: string,
        }]
      }) => (
          <>
            <span className="font-base w-full flex">{record.link}</span>
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
      width: '15%',
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
      width: '15%',
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
      width: '15%',
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
      width: '15%',
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
      width: '15%',
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
      <div className="border border-solid border-gray-300">
        <PageHeader
          title={<h2 className="text-3xl mb-0 text-gray-700">{name}</h2>}
          extra={
            <>
              <AddLinkModal projectId={id} />
              <Link
                href={`/projects/edit?id=${id}`}
                as={`/projects/${id}/edit`}
              >
                <Button type="default" icon="highlight" size="large">
                  Edit Project
                </Button>
              </Link>
            </>
          }
        />
      </div>
      <div className="mt-8 bg-white rounded">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={urls}
          pagination={false}
          bordered
          expandedRowRender={
            (record: {
              audits: [{ id: string }]
            }) => !!record.audits.length
                ? <LinkDetails id={record.audits[0].id} />
                : <Empty />
          }
        />
      </div>
    </>
  )
}

export default withApollo(ProjectsShow)
