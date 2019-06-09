import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Query } from 'react-apollo'
import { Table, Drawer } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'
import AuditsTable from './audits-table'

const fetchProjectQuery = gql`
  query($id: ID!) {
    project(id: $id) {
      _id
      name
      users {
        _id
        username
      }
      urls {
        _id
        link
        audits {
          _id
          categories
          lighthouseVersion
        }
      }
    }
  }
`

class ProjectsShow extends Component {
  state = {
    visible: false,
    selectedItemId: '',
    audits: [],
  }

  columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text, records) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: records._id,
              audits: records.audits,
            })
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (text, records) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: records._id,
              audits: records.audits,
            })
          }
        >
          {text}
        </a>
      ),
    },
  ]

  showDrawer = ({ id, audits }) => {
    this.setState({
      visible: true,
      selectedItemId: id,
      audits,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
      selectedItemId: '',
      audits: [],
    })
  }

  drawerNode = () => {
    return (
      <Drawer
        width={1000}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        title="Audits"
      >
        <AuditsTable audits={this.state.audits} />
      </Drawer>
    )
  }

  render() {
    return (
      <Query
        query={fetchProjectQuery}
        variables={{ id: this.props.id }}
        fetchPolicy="network-only"
      >
        {({ data, error, loading }) => {
          if (loading) return <Loader />

          if (error) return <p>Error: {error.message}</p>

          const { name, urls } = data.project

          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <div className="text-3xl">{name}</div>
              </div>
              <div className="mt-8 min-h-screen bg-white border border-solid border-gray-300 rounded pt-8 px-8">
                {this.drawerNode()}
                <Table
                  rowKey="_id"
                  bordered
                  columns={this.columns}
                  dataSource={urls}
                />
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default withApollo(ProjectsShow)
