import React, { Fragment } from 'react'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, Progress } from 'antd'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchProjectsQuery = gql`
  query {
    projects {
      _id
      name
      users {
        _id
        username
      }
    }
  }
`
const deleteProjectMutation = gql`
  mutation($id: ID!) {
    deleteProject(input: { where: { id: $id } }) {
      project {
        _id
      }
    }
  }
`
const ProjectsIndex = (props: any) => {
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
      render: (_: string, record: { name: string; _id: number }) => (
        <Fragment>
          <Link
            href={`/projects/show?id=${record._id}`}
            as={`/projects/${record._id}`}
          >
            <a className="font-semibold">{record.name}</a>
          </Link>
          <div className="text-xs text-gray-500">{record._id}</div>
        </Fragment>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      width: '20%',
      render: (_: string, record: { users: []; _id: number }) => (
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
    {
      key: 'actions',
      width: '10%',
      render: (_: string, record: { _id: number }) => (
        <Button
          type="danger"
          icon="delete"
          onClick={async () => {
            await props.client.mutate({
              mutation: deleteProjectMutation,
              variables: { id: record._id },
            })

            await props.client.query({
              query: fetchProjectsQuery,
              fetchPolicy: 'network-only',
            })
          }}
        />
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
              <div className="text-3xl">Projects</div>
              <Link href={`/projects/new`} as={`/projects/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  New Project
                </Button>
              </Link>
            </div>
            <div className="mt-8 bg-white rounded">
              <Table
                rowKey="_id"
                bordered
                dataSource={data.projects}
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
