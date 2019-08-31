import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import { Table, Button, Progress, PageHeader, Icon, Avatar, Popover } from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Router from 'next/router'
import Gravatar from 'react-gravatar'

import Loader from '../../common/loader'
import AddLinkModal from './add-link-modal'
import AddUsersToProjectModal from './add-users-to-project'
import calculateProgress from "../../../lib/calculate-progress"

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
        audits(limit: 1, order_by: {fetch_time: desc}) {
          id
          created_at
          categories_accessibility_score
          categories_best_practices_score
          categories_performance_score
          categories_pwa_score
          categories_seo_score
          url {
            link
          }
        }
      }
      users {
        user {
          id
          email
        }
      }
    }
  }
`

const SitesShow = (props: any) => {
  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Link</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 500,
      fixed: 'left',
      render: (_: string, record: {
        id: string,
        link: string,
        audits: [{
          link: string,
          created_at: string,
        }]
      }) => (
          <>
            <Link
              href={`/sites/links?id=${record.id}&siteId=${props.id}`}
              as={`/sites/${props.id}/links/${record.id}`}
            >
              <a className="font-base w-full flex">
                <div>
                  <div className="text-sm">{record.link}</div>
                  <div className="text-xs mt-1 text-gray-500 font-hairline">
                    {!!record.audits.length
                      ? `Last audit was ${dayjs(record.audits[0].created_at).fromNow()}`
                      : "Link will be audited soon"
                    }
                  </div>
                </div>
              </a>
            </Link>
          </>
        ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Performance</span>,
      dataIndex: 'performance',
      key: 'performance',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_performance_score: number
          }]
        }
      ) => calculatePerformanceScore(record, !!record.audits.length && record.audits[0].categories_performance_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">A11Y</span>,
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_accessibility_score: number
          }]
        }
      ) => calculatePerformanceScore(record, !!record.audits.length && record.audits[0].categories_accessibility_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_seo_score: number
          }]
        }
      ) => calculatePerformanceScore(record, !!record.audits.length && record.audits[0].categories_seo_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Best Practices</span>,
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_best_practices_score: number
          }]
        }
      ) => calculatePerformanceScore(record, !!record.audits.length && record.audits[0].categories_best_practices_score),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      render: (
        _: string,
        record: {
          audits: [{
            created_at: string,
            categories_seo_score: number
          }]
        }
      ) => calculatePerformanceScore(record, !!record.audits.length && record.audits[0].categories_seo_score),
    },
  ]

  const calculatePerformanceScore = (record: any, scoreInFloat: number) => {
    if (!record.audits.length) {
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

    return calculateProgress(scoreInFloat)
  }

  const { data, loading, error } = useSubscription(fetchProjectSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { id, name, urls, users } = data.project_by_pk
  const ButtonGroup = Button.Group;

  const userAvatarsNode = () => {
    return (
      <div className="inline-flex mr-4 invisible lg:visible">
        {users.slice(0, 3).map((data: { user: { id: string, email: string } }, index: number) => {
          return (
            <Popover key={index} content={data.user.email}>
              <div
                style={{
                  marginLeft: "-15px"
                }}>
                <Gravatar
                  email={data.user.email}
                  size={40}
                  className="rounded-full border-3 border-solid border-white"
                />
              </div>
            </Popover>
          )
        })}
        {users.length > 3 &&
          <div
            style={{
              marginLeft: "-15px"
            }}
          >
            <Avatar
              size={40}
              className="rounded-full border-3 border-solid border-white flex items-center"
              style={{
                backgroundColor: "#2196f3"
              }}
            >
              {users.length - 2}
            </Avatar>
          </div>
        }
      </div>
    )
  }

  return (
    <>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        <PageHeader
          onBack={() => Router.push('/sites')}
          title={name}
          extra={
            <div className="m-2">
              {userAvatarsNode()}
              <ButtonGroup className="mr-4">
                <AddUsersToProjectModal
                  projectId={id}
                  projectName={name}
                  projectUsers={users}
                />
                <AddLinkModal projectId={id} />
              </ButtonGroup>
              <Link
                href={`/sites/edit?id=${id}`}
                as={`/sites/${id}/edit`}
              >
                <Button type="primary" icon="highlight" size="large">
                  Edit Site Details
                </Button>
              </Link>
            </div>
          }
        >
          <p className="text-gray-600 mb-0">
            Details for {name}
          </p>
        </PageHeader>
      </div>
      <div className="p-8">
        <div className="bg-white rounded mx-auto">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={urls}
            pagination={false}
            bordered
            scroll={{ x: 1300 }}
          />
        </div>


      </div>
    </>
  )
}

export default withApollo(SitesShow)
