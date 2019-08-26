import React, { Fragment } from 'react'
import { withApollo, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, PageHeader, Badge } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

import Loader from '../../common/loader'

const fetchProjectsSubscription = gql`
  subscription {
    project {
      id
      name
      login_url
      urls_aggregate {
        aggregate {
          count
        }
        nodes {
          id
          audits(limit: 1) {
            categories_accessibility_score
            categories_best_practices_score
            categories_performance_score
            categories_pwa_score
            categories_seo_score
          }
        }
      }
      users {
        id
      }
    }
  }
`

const ProjectsIndex = () => {
  const columns: any = [
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Name</span>,
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (_: string, record: { name: string; id: number }) => (
        <Fragment>
          <Link
            href={`/projects/show?id=${record.id}`}
            as={`/projects/${record.id}`}
          >
            <a className="font-base w-full flex">{record.name}</a>
          </Link>
        </Fragment>
      ),
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Accessibility</span>,
      dataIndex: 'a11y',
      key: 'a11y',
      width: '10%',
      render: (
        _: string,
        record: {
          urls_aggregate: {
            nodes: [{
              audits: [{ categories_accessibility_score: number }]
            }]
          }
        }
      ) => (!!record.urls_aggregate.nodes.length && !!record.urls_aggregate.nodes[0].audits.length)
        && calculateProgress(record.urls_aggregate.nodes[0].audits[0].categories_accessibility_score)
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Best Practices</span>,
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: '10%',
      render: (
        _: string,
        record: {
          urls_aggregate: {
            nodes: [{
              audits: [{ categories_best_practices_score: number }]
            }]
          }
        }
      ) => (!!record.urls_aggregate.nodes.length && !!record.urls_aggregate.nodes[0].audits.length)
        && calculateProgress(record.urls_aggregate.nodes[0].audits[0].categories_best_practices_score)
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Performance</span>,
      dataIndex: 'performance',
      key: 'performance',
      width: '10%',
      render: (
        _: string,
        record: {
          urls_aggregate: {
            nodes: [{
              audits: [{ categories_performance_score: number }]
            }]
          }
        }
      ) => (!!record.urls_aggregate.nodes.length && !!record.urls_aggregate.nodes[0].audits.length)
        && calculateProgress(record.urls_aggregate.nodes[0].audits[0].categories_performance_score)
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      width: '10%',
      render: (
        _: string,
        record: {
          urls_aggregate: {
            nodes: [{
              audits: [{ categories_pwa_score: number }]
            }]
          }
        }
      ) => (!!record.urls_aggregate.nodes.length && !!record.urls_aggregate.nodes[0].audits.length)
        && calculateProgress(record.urls_aggregate.nodes[0].audits[0].categories_pwa_score)
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: '10%',
      render: (
        _: string,
        record: {
          urls_aggregate: {
            nodes: [{
              audits: [{ categories_seo_score: number }]
            }]
          }
        }
      ) => (!!record.urls_aggregate.nodes.length && !!record.urls_aggregate.nodes[0].audits.length)
        && calculateProgress(record.urls_aggregate.nodes[0].audits[0].categories_seo_score)
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Pages</span>,
      dataIndex: 'pages',
      key: 'pages',
      width: '10%',
      render: (
        _: string,
        record: { urls_aggregate: { aggregate: { count: number } } }
      ) => (
          <span className="text-sm">
            {record.urls_aggregate.aggregate.count}
            <span className="text-gray-500 text-xs"> /50</span>
          </span>
        ),
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Users</span>,
      dataIndex: 'users',
      key: 'users',
      width: '10%',
      render: (_: string, record: { users: []; id: number }) => (
        <Fragment>
          <span className="text-sm">
            {record.users ? record.users.length : 0}
          </span>
          <span className="text-gray-500 text-xs"> /10</span>
        </Fragment>
      ),
    },
    {
      title: () => <span className='text-xs uppercase text-gray-700'>Authentication</span>,
      dataIndex: 'authentication',
      key: 'authentication',
      width: '10%',
      render: (_: string, record: { login_url: string }) =>
        !!record.login_url ? (
          <>
            <Badge status="success" text="Enabled" title="Enabled" />
          </>
        ) : (
            <>
              <Badge status="error" text="Disabled" title="Disabled" />
            </>
          ),
    },
  ]

  const calculateProgress = (record: number) => {
    const score = record * 100

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

  const { data, loading, error } = useSubscription(
    fetchProjectsSubscription
  );

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Fragment>
      <div className="border border-solid border-gray-300">
        <PageHeader
          onBack={() => Router.push('/projects')}
          title={
            <h2 className="text-3xl m-2 text-gray-700">Projects</h2>
          }
          extra={
            <div className="m-2">
              <Link href={`/projects/new`} as={`/projects/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  Create new Project
              </Button>
              </Link>
            </div>
          }
        />
      </div>
      <div className="m-8 bg-white rounded">
        <Table
          rowKey="id"
          dataSource={data.project}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </Fragment>
  )
}

export default withApollo(ProjectsIndex)
