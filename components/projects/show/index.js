import React, { Component, Fragment, useState } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, useSubscription } from 'react-apollo'
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
        audits(limit: 1) {
          id
          categories
          lighthouse_version
        }
      }
    }
  }
`

const ProjectsShow = props => {
  const [visible, setVisibility] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState('')
  const [audits, setAudits] = useState([])

  const columns = [
    {
      title: 'Link',
      dataIndex: 'id',
      key: 'id',
      width: 500,
      render: (text, record) => (
        <a
          href="javascript:;"
          onClick={() =>
            showDrawer({
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
      width: 100,
      render: (text, record) => calculateProgress(record.audits, 'performance'),
    },
    {
      title: 'Accessibility',
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: 100,
      render: (text, record) =>
        calculateProgress(record.audits, 'accessibility'),
    },
    {
      title: 'Best Practices',
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: 100,
      render: (text, record) =>
        calculateProgress(record.audits, 'best-practices'),
    },
    {
      title: 'SEO',
      dataIndex: 'seo',
      key: 'seo',
      width: 100,
      render: (text, record) => calculateProgress(record.audits, 'seo'),
    },
    {
      title: 'PWA',
      dataIndex: 'pwa',
      key: 'pwa',
      width: 100,
      render: (text, record) => calculateProgress(record.audits, 'pwa'),
    },
  ]

  const calculateProgress = (record, id) => {
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

    const score = parseInt(
      record[record.length - 1].categories[id].score * 100,
      10
    )

    if (score <= 49) {
      return (
        <Fragment>
          <span className="text-red-700 text-base">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </Fragment>
      )
    } else if (score <= 89) {
      return (
        <Fragment>
          <span className="text-blue-700 text-base">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <span className="text-green-700 text-base">{score}</span>
          <span className="text-gray-500 text-xs"> /100</span>
        </Fragment>
      )
    }
  }

  const showDrawer = ({ id, audits }) => {
    setVisibility(true)
    setSelectedItemId(id)
    setAudits(audits)
  }

  const onClose = () => {
    setVisibility(false)
    setSelectedItemId('')
    setAudits([])
  }

  const drawerNode = () => {
    return (
      <Drawer
        width={1000}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        title="Audits"
      >
        <AuditsTable audits={audits} />
      </Drawer>
    )
  }

  const { data, loading, error } = useSubscription(fetchProjectSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { id, name, urls } = data.project_by_pk

  return (
    <Fragment>
      <div className="border border-solid border-gray-300">
        <PageHeader
          title={<h2 className="text-3xl mb-0 text-gray-700">{name}</h2>}
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
        {drawerNode()}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={urls}
          pagination={false}
          scroll={{ x: 800 }}
        />
      </div>
    </Fragment>
  )
}

export default withApollo(ProjectsShow)
