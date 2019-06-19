import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Subscription } from 'react-apollo'
import { Table, Drawer, Button } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'
import AuditsTable from './audits-table'
import AddLinkModal from './add-link-modal'

const fetchProjectSubscription = gql`
  subscription($id: uuid!) {
    project_by_pk(id: $id) {
      id
      name
      urls {
        id
        link
        audits {
          id
          categories
          lighthouse_version
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
      dataIndex: 'id',
      key: 'id',
      render: (text, records) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: records.id,
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
              id: records.id,
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
      <Subscription
        subscription={fetchProjectSubscription}
        variables={{ id: this.props.id }}
        fetchPolicy="network-only"
      >
        {({ data, error, loading }) => {
          if (loading) return <Loader />

          if (error) return <p>Error: {error.message}</p>

          const { id, name, urls } = data.project_by_pk

          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <div className="text-3xl">{name}</div>
                <div>
                  <AddLinkModal projectId={id} />
                  <Link
                    href={`/projects/edit?id=${id}`}
                    as={`/projects/${id}/edit`}
                  >
                    <Button type="default" icon="plus-circle" size="large">
                      Edit Project
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 bg-white rounded">
                {this.drawerNode()}
                <Table
                  rowKey="id"
                  bordered
                  columns={this.columns}
                  dataSource={urls}
                  pagination={false}
                />
              </div>
            </Fragment>
          )
        }}
      </Subscription>
    )
  }
}

export default withApollo(ProjectsShow)
