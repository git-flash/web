import React, { Fragment } from 'react'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table } from 'antd'
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
        <Link
          href={`/projects/show?id=${record._id}`}
          as={`/projects/${record._id}`}
        >
          <a>{record.name}</a>
        </Link>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      width: '20%',
      render: (_: string, record: { users: []; _id: number }) => (
        <div>{record.users ? record.users.length : 0} users</div>
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
        >
          Delete
        </Button>
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
            <div className="mt-8 min-h-screen bg-white border border-solid border-gray-300 rounded pt-8 px-8">
              <Table
                bordered
                dataSource={data.projects}
                columns={columns}
                rowKey="_id"
              />
            </div>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default withApollo(ProjectsIndex)
