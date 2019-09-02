import React from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import {
  Table,
  Button,
  Progress,
  PageHeader,
  Icon,
  Avatar,
  Popover,
} from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Router from 'next/router'
import Gravatar from 'react-gravatar'
import truncate from 'lodash/truncate'

import Loader from '../../common/loader'
import AddLinkModal from './add-link-modal'
import AddUsersToSiteModal from './add-users-to-site'
import calculateProgress from '../../../lib/calculate-progress'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const fetchSiteSubscription = gql`
  subscription($id: uuid!) {
    site_by_pk(id: $id) {
      id
      name
      pages {
        id
        link
        audits(limit: 1, order_by: { fetch_time: desc }) {
          id
          created_at
          categories_accessibility_score
          categories_best_practices_score
          categories_performance_score
          categories_pwa_score
          categories_seo_score
          page {
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

const deletePageMutation = gql`
  mutation($id: uuid!) {
    delete_page(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

const SitesShow = (props: any) => {
  const ButtonGroup = Button.Group

  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Page</span>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 350,
      fixed: 'left',
      render: (
        _: string,
        record: {
          id: string
          link: string
          audits: [
            {
              link: string
              created_at: string
            }
          ]
        }
      ) => (
        <Link
          href={`/sites/pages?id=${record.id}&siteId=${props.id}`}
          as={`/sites/${props.id}/pages/${record.id}`}
        >
          <a className="font-base w-full flex-col">
            <div className="text-sm">
              {truncate(record.link, { length: 40, separator: '...' })}
            </div>
            <div className="text-xs mt-1 text-gray-500 font-hairline">
              {!!record.audits.length
                ? `Last audit was ${dayjs(
                    record.audits[0].created_at
                  ).fromNow()}`
                : 'Link will be audited soon'}
            </div>
          </a>
        </Link>
      ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">Performance</span>
      ),
      dataIndex: 'performance',
      key: 'performance',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [
            {
              categories_performance_score: number
            }
          ]
        }
      ) =>
        calculatePerformanceScore(
          record,
          !!record.audits.length &&
            record.audits[0].categories_performance_score
        ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">Accessibility</span>
      ),
      dataIndex: 'accessibility',
      key: 'accessibility',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [
            {
              categories_accessibility_score: number
            }
          ]
        }
      ) =>
        calculatePerformanceScore(
          record,
          !!record.audits.length &&
            record.audits[0].categories_accessibility_score
        ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [
            {
              categories_seo_score: number
            }
          ]
        }
      ) =>
        calculatePerformanceScore(
          record,
          !!record.audits.length && record.audits[0].categories_seo_score
        ),
    },
    {
      title: (
        <span className="text-xs uppercase text-gray-700">Best Practices</span>
      ),
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [
            {
              categories_best_practices_score: number
            }
          ]
        }
      ) =>
        calculatePerformanceScore(
          record,
          !!record.audits.length &&
            record.audits[0].categories_best_practices_score
        ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      width: 150,
      render: (
        _: string,
        record: {
          audits: [
            {
              categories_pwa_score: number
            }
          ]
        }
      ) =>
        calculatePerformanceScore(
          record,
          !!record.audits.length && record.audits[0].categories_pwa_score
        ),
    },
    {
      title: <span className="text-xs uppercase text-gray-700">Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (
        _: string,
        record: {
          id: number
        }
      ) => (
        <div>
          <ButtonGroup>
            <Link
              href={`/sites/pages?id=${record.id}&siteId=${props.id}`}
              as={`/sites/${props.id}/pages/${record.id}`}
            >
              <Button>
                <Icon type="highlight" />
              </Button>
            </Link>
            <Button
              onClick={() => {
                props.client.mutate({
                  mutation: deletePageMutation,
                  variables: {
                    id: record.id,
                  },
                })
              }}
            >
              <Icon type="delete" />
            </Button>
          </ButtonGroup>
        </div>
      ),
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

  const { data, loading, error } = useSubscription(fetchSiteSubscription, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { id, name, pages, users } = data.site_by_pk

  const userAvatarsNode = () => {
    return (
      <div className="inline-flex mr-4 invisible lg:visible">
        {users
          .slice(0, 3)
          .map(
            (data: { user: { id: string; email: string } }, index: number) => {
              return (
                <Popover key={index} content={data.user.email}>
                  <div
                    style={{
                      marginLeft: '-15px',
                    }}
                  >
                    <Gravatar
                      email={data.user.email}
                      size={40}
                      className="rounded-full border-3 border-solid border-white"
                    />
                  </div>
                </Popover>
              )
            }
          )}
        {users.length > 3 && (
          <div
            style={{
              marginLeft: '-15px',
            }}
          >
            <Avatar
              size={40}
              className="rounded-full border-3 border-solid border-white flex items-center"
              style={{
                backgroundColor: '#2196f3',
              }}
            >
              {users.length - 2}
            </Avatar>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        <PageHeader
          onBack={() => Router.push('/sites')}
          title={truncate(name, { length: 40, separator: '...' })}
          extra={
            <div className="m-2 flex items-center">
              {userAvatarsNode()}
              <ButtonGroup className="mr-4">
                <AddUsersToSiteModal
                  siteId={id}
                  siteName={name}
                  siteUsers={users}
                />
                <AddLinkModal siteId={id} />
              </ButtonGroup>
              <Link href={`/sites/edit?id=${id}`} as={`/sites/${id}/edit`}>
                <Button type="primary" icon="highlight" size="large">
                  Edit Site Details
                </Button>
              </Link>
            </div>
          }
        >
          <p className="text-xs text-gray-500 font-hairline mb-0">
            Details for {truncate(name, { length: 40, separator: '...' })}
          </p>
        </PageHeader>
      </div>
      <div className="p-8">
        <div className="bg-white rounded mx-auto">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={pages}
            pagination={false}
            bordered
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    </>
  )
}

export default withApollo(SitesShow)
