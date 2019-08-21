import React, { Fragment } from 'react'
import { withApollo, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, Progress, PageHeader, Badge } from 'antd'
import Link from 'next/link'

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      render: (_: string, record: { name: string; id: number }) => (
        <Fragment>
          <Link
            href={`/projects/show?id=${record.id}`}
            as={`/projects/${record.id}`}
          >
            <a className="font-semibold">{record.name}</a>
          </Link>
          <div className="text-gray-500 text-xs">{record.id}</div>
        </Fragment>
      ),
    },
    {
      title: 'Pages',
      dataIndex: 'pages',
      key: 'pages',
      width: '20%',
      render: (
        _: string,
        record: { urls_aggregate: { aggregate: { count: number } } }
      ) => (
          <span className="text-base">
            {record.urls_aggregate.aggregate.count}
            <span className="text-gray-500 text-xs"> /50</span>
            <Progress
              size='small'
              percent={
                record.urls_aggregate.aggregate.count
                  ? (record.urls_aggregate.aggregate.count / 5) * 10
                  : 0
              }
              showInfo={false}
            />
          </span>
        ),
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      width: '20%',
      render: (_: string, record: { users: []; id: number }) => (
        <Fragment>
          <span className="text-base">
            {record.users ? record.users.length : 0}
          </span>
          <span className="text-gray-500 text-xs"> /10</span>
          <Progress
            size='small'
            percent={record.users ? record.users.length * 10 : 0}
            showInfo={false}
          />
        </Fragment>
      ),
    },
    {
      title: 'Authentication',
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

  const { data, loading, error } = useSubscription(
    fetchProjectsSubscription
  );

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Fragment>
      <div className="border border-solid border-gray-300">
        <PageHeader
          title={
            <h2 className="text-3xl mb-0 text-gray-700">Projects</h2>
          }
          extra={
            <Link href={`/projects/new`} as={`/projects/new`}>
              <Button type="primary" icon="plus-circle" size="large">
                Create new Project
              </Button>
            </Link>
          }
        />
      </div>
      <div className="mt-8 bg-white rounded">
        <Table
          rowKey="id"
          dataSource={data.project}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </div>
    </Fragment>
  )
}

export default withApollo(ProjectsIndex)
