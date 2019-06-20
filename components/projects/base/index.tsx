import React, { Fragment } from 'react'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, Progress } from 'antd'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchProjectsQuery = gql`
  query {
    project {
      id
      name
      users {
        user {
          id
        }
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
      width: '70%',
      render: (_: string, record: { name: string; id: number }) => (
        <Fragment>
          <Link
            href={`/projects/show?id=${record.id}`}
            as={`/projects/${record.id}`}
          >
            <a className="font-semibold">{record.name}</a>
          </Link>
          <div className="text-xs text-gray-500">{record.id}</div>
        </Fragment>
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
          <span className="text-xs text-gray-500"> /10</span>
          <Progress
            percent={record.users ? record.users.length * 10 : 0}
            showInfo={false}
          />
        </Fragment>
      ),
    },
  ]

  return (
    <Query query={fetchProjectsQuery} fetchPolicy="network-only">
      {({ data, error, loading }) => {
        if (loading) return <Loader />

        if (error) return <p>Error: {error.message}</p>

        return (
          <Fragment>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl mb-0 text-gray-700"> Projects</h2>
              <Link href={`/projects/new`} as={`/projects/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  Create new Project
                </Button>
              </Link>
            </div>
            <div className="mt-8 bg-white rounded">
              <Table
                rowKey="id"
                bordered
                dataSource={data.project}
                columns={columns}
                pagination={false}
              />
            </div>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default withApollo(ProjectsIndex)
