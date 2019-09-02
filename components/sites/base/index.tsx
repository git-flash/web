import React, { Fragment } from 'react'
import { withApollo, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, PageHeader, Icon } from 'antd'
import Link from 'next/link'
import truncate from 'lodash/truncate'

import Loader from '../../common/loader'
import calculateProgress from '../../../lib/calculate-progress'

const fetchSitesSubscription = gql`
  subscription {
    site(order_by: { created_at: desc }) {
      id
      name
      login_url
      pages_aggregate {
        aggregate {
          count
        }
        nodes {
          id
          audits(limit: 1, order_by: { fetch_time: desc }) {
            categories_accessibility_score
            categories_best_practices_score
            categories_performance_score
            categories_pwa_score
            categories_seo_score
            audit_screenshot_thumbnails
          }
        }
      }
      users {
        id
      }
    }
  }
`

const deleteSiteMutation = gql`
  mutation($id: uuid!) {
    delete_site(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

const SitesIndex = (props: any) => {
  const ButtonGroup = Button.Group

  const columns: any = [
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Name</span>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 350,
      fixed: 'left',
      render: (
        _: string,
        record: {
          id: number
          name: string
          pages_aggregate: {
            nodes: [
              {
                audits: [
                  {
                    audit_screenshot_thumbnails: {
                      items: [
                        {
                          data: string
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        }
      ) => {
        const thumbnails =
          record.pages_aggregate.nodes.length &&
          record.pages_aggregate.nodes[0].audits.length &&
          record.pages_aggregate.nodes[0].audits[0]
            .audit_screenshot_thumbnails &&
          record.pages_aggregate.nodes[0].audits[0].audit_screenshot_thumbnails
            .items

        return (
          <Link href={`/sites/show?id=${record.id}`} as={`/sites/${record.id}`}>
            <a className="font-base w-full flex-col">
              {!!thumbnails ? (
                <div className="flex items-center">
                  <img
                    src={thumbnails[thumbnails.length - 1].data}
                    alt={record.name}
                    width={20}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-semibold">
                      {truncate(record.name, { length: 40, separator: '...' })}
                    </div>
                    <div className="text-xs mt-1 text-gray-500 font-hairline">
                      {record.id}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ml-10">
                  <div className="text-sm font-semibold">
                    {truncate(record.name, {
                      length: 40,
                      separator: '...',
                    })}
                  </div>
                  <div className="text-xs mt-1 text-gray-500 font-hairline">
                    {record.id}
                  </div>
                </div>
              )}
            </a>
          </Link>
        )
      },
    },
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Performance</span>
      ),
      dataIndex: 'performance',
      key: 'performance',
      width: 150,
      render: (
        _: string,
        record: {
          pages_aggregate: {
            nodes: [
              {
                audits: [{ categories_performance_score: number }]
              }
            ]
          }
        }
      ) =>
        !!record.pages_aggregate.nodes.length &&
        !!record.pages_aggregate.nodes[0].audits.length &&
        calculateProgress(
          record.pages_aggregate.nodes[0].audits[0].categories_performance_score
        ),
    },
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Accessibility</span>
      ),
      dataIndex: 'a11y',
      key: 'a11y',
      width: 150,
      render: (
        _: string,
        record: {
          pages_aggregate: {
            nodes: [
              {
                audits: [{ categories_accessibility_score: number }]
              }
            ]
          }
        }
      ) =>
        !!record.pages_aggregate.nodes.length &&
        !!record.pages_aggregate.nodes[0].audits.length &&
        calculateProgress(
          record.pages_aggregate.nodes[0].audits[0]
            .categories_accessibility_score
        ),
    },
    {
      title: () => <span className="text-xs uppercase text-gray-700">SEO</span>,
      dataIndex: 'seo',
      key: 'seo',
      width: 150,
      render: (
        _: string,
        record: {
          pages_aggregate: {
            nodes: [
              {
                audits: [{ categories_seo_score: number }]
              }
            ]
          }
        }
      ) =>
        !!record.pages_aggregate.nodes.length &&
        !!record.pages_aggregate.nodes[0].audits.length &&
        calculateProgress(
          record.pages_aggregate.nodes[0].audits[0].categories_seo_score
        ),
    },
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Best Practices</span>
      ),
      dataIndex: 'bestPractices',
      key: 'bestPractices',
      width: 150,
      render: (
        _: string,
        record: {
          pages_aggregate: {
            nodes: [
              {
                audits: [{ categories_best_practices_score: number }]
              }
            ]
          }
        }
      ) =>
        !!record.pages_aggregate.nodes.length &&
        !!record.pages_aggregate.nodes[0].audits.length &&
        calculateProgress(
          record.pages_aggregate.nodes[0].audits[0]
            .categories_best_practices_score
        ),
    },
    {
      title: () => <span className="text-xs uppercase text-gray-700">PWA</span>,
      dataIndex: 'pwa',
      key: 'pwa',
      width: 150,
      render: (
        _: string,
        record: {
          pages_aggregate: {
            nodes: [
              {
                audits: [{ categories_pwa_score: number }]
              }
            ]
          }
        }
      ) =>
        !!record.pages_aggregate.nodes.length &&
        !!record.pages_aggregate.nodes[0].audits.length &&
        calculateProgress(
          record.pages_aggregate.nodes[0].audits[0].categories_pwa_score
        ),
    },
    {
      title: () => (
        <span className="text-xs uppercase text-gray-700">Pages</span>
      ),
      dataIndex: 'pages',
      key: 'pages',
      render: (
        _: string,
        record: { pages_aggregate: { aggregate: { count: number } } }
      ) => (
        <span className="text-sm">
          {record.pages_aggregate.aggregate.count}
          <span className="text-gray-500 text-xs"> /50</span>
        </span>
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
              href={`/sites/show?id=${record.id}`}
              as={`/sites/${record.id}`}
            >
              <Button>
                <Icon type="highlight" />
              </Button>
            </Link>
            <Button
              onClick={() => {
                props.client.mutate({
                  mutation: deleteSiteMutation,
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

  const { data, loading, error } = useSubscription(fetchSitesSubscription)

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Fragment>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        <PageHeader
          title="Sites"
          extra={
            <div className="m-2">
              <Link href={`/sites/new`} as={`/sites/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  Create New Site
                </Button>
              </Link>
            </div>
          }
        >
          <p className="text-xs text-gray-500 font-hairline mb-0">
            A list of all your sites
          </p>
        </PageHeader>
      </div>
      <div className="p-8">
        <div className="bg-white rounded mx-auto border border-b-0 border-solid border-gray-300 shadow-lg">
          <Table
            rowKey="id"
            dataSource={data.site}
            columns={columns}
            pagination={false}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default withApollo(SitesIndex)
