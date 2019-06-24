import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Subscription } from 'react-apollo'
import { Table, Drawer, Button, Progress, PageHeader, Icon } from 'antd'
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
      render: (text, record) => (
        <a
          href="javascript:;"
          onClick={() =>
            this.showDrawer({
              id: record.id,
              audits: record.audits,
            })
          }
        >
          {record.link}
        </a>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      width: '10%',
      render: (text, record) =>
        this.calculateProgress(record.audits, 'performance'),
    },
    {
      title: 'Accessibility',
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: '10%',
      render: (text, record) =>
        this.calculateProgress(record.audits, 'accessibility'),
    },
    {
      title: 'Best Practices',
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: '10%',
      render: (text, record) =>
        this.calculateProgress(record.audits, 'best-practices'),
    },
    {
      title: 'SEO',
      dataIndex: 'seo',
      key: 'seo',
      width: '10%',
      render: (text, record) => this.calculateProgress(record.audits, 'seo'),
    },
    {
      title: 'PWA',
      dataIndex: 'pwa',
      key: 'pwa',
      width: '10%',
      render: (text, record) => this.calculateProgress(record.audits, 'pwa'),
    },
  ]

  calculateProgress = (record, id) => {
    if (!record[record.length - 1]) {
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

    const score = record[record.length - 1].categories[id].score * 100

    if (score <= 49) {
      return (
        <Progress
          type="circle"
          percent={score}
          format={percent => Math.round(percent)}
          width={30}
          strokeWidth={10}
          status="exception"
        />
      )
    } else if (score <= 89) {
      return (
        <Progress
          type="circle"
          percent={score}
          format={percent => Math.round(percent)}
          width={30}
          strokeWidth={10}
          status="normal"
        />
      )
    } else {
      return (
        <Progress
          type="circle"
          percent={score}
          format={percent => Math.round(percent)}
          width={30}
          strokeWidth={10}
          status="success"
        />
      )
    }
  }

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
              <div className="border border-solid border-gray-300">
                <PageHeader
                  title={
                    <h2 className="text-3xl mb-0 text-gray-700">{name}</h2>
                  }
                  extra={
                    <Fragment>
                      <AddLinkModal projectId={id} />
                      <Link
                        href={`/projects/edit?id=${id}`}
                        as={`/projects/${id}/edit`}
                      >
                        <Button type="default" icon="highlight" size="large">
                          Edit Project
                        </Button>
                      </Link>
                    </Fragment>
                  }
                />
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
