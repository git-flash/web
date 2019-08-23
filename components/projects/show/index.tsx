import React, { useState } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import {
  Table, Drawer, Button, Progress, PageHeader, Icon,

} from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import Loader from '../../common/loader'
import AuditsTable from './audits-table'
import AddLinkModal from './add-link-modal'

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
          categories
          created_at
        }
      }
    }
  }
`

const ProjectsShow = (props: any) => {
  const [visible, setVisibility] = useState(false)
  const [audits, setAudits] = useState([])

  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Link</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (_: string, record: {
        id: string,
        link: string,
        audits: [{ created_at: string }],
      }) => (
          <>
            <a
              href="javascript:;"
              onClick={() =>
                showDrawer({
                  audits: record.audits,
                })
              }
            >
              <span className="font-base w-full flex">{record.link}</span>
            </a>
            {record.audits.length
              ? <span className="text-xs text-gray-500 mt-1 flex">
                Last audit was {dayjs(record.audits[record.audits.length - 1].created_at).fromNow()}
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
      width: '10%',
      render: (
        _: string,
        record: {
          audits: [{ categories: { performance: { score: number } } }],
        }
      ) => calculateProgress(record.audits, 'performance'),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">A11Y</span>,
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: '10%',
      render: (
        _: string,
        record: {
          audits: [{ categories: { accessibility: { score: number } } }],
        }
      ) => calculateProgress(record.audits, 'accessibility'),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: '10%',
      render: (
        _: string,
        record: {
          audits: [{ categories: { seo: { score: number } } }],
        }
      ) => calculateProgress(record.audits, 'seo'),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Best Practices</span>,
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: '10%',
      render: (
        _: string,
        record: {
          audits: [{ categories: { seo: { score: number } } }],
        }
      ) => calculateProgress(record.audits, 'best-practices'),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      width: '10%',
      render: (
        _: string,
        record: {
          audits: [{ categories: { seo: { score: number } } }],
        }
      ) => calculateProgress(record.audits, 'pwa'),
    },
  ]

  const calculateProgress = (record: any, id: string) => {
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

    const score = Math.round(record[record.length - 1].categories[id].score * 100)

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

  const showDrawer = ({ audits }: { audits: any }) => {
    setVisibility(true)
    setAudits(audits)
  }

  const onClose = () => {
    setVisibility(false)
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
        {drawerNode()}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={urls}
          pagination={false}
          bordered
        />
      </div>
    </>
  )
}

export default withApollo(ProjectsShow)
