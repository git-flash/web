import React, { Fragment } from 'react'
import { withApollo, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import PageHeader from 'antd/lib/page-header'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Progress from 'antd/lib/progress'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchSitesSubscription = gql`
  subscription {
    site(order_by: { created_at: desc }) {
      id
      name
      pages_aggregate {
        aggregate {
          count
        }
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
  const { data, loading, error } = useSubscription(fetchSitesSubscription)

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Fragment>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
        <PageHeader
          title={
            <div className="text-xl" style={{ margin: '12px 0 0 12px' }}>
              Sites
            </div>
          }
          extra={
            <div className="m-2">
              <Link href={`/sites/new`} as={`/sites/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  Create New Site
                </Button>
              </Link>
            </div>
          }
        />
      </div>
      <Row className="m-8" gutter={24}>
        {data.site.map(
          (site: { name: String; id: number; pages_aggregate: any }) => {
            return (
              <Col key={site.id} xs={24} sm={24} md={8} lg={6}>
                <Link
                  href={`/sites/[siteId]?id=${site.id}`}
                  as={`/sites/${site.id}`}
                >
                  <Card
                    className="rounded mb-8 shadow"
                    hoverable
                    title={
                      <span className="text-gray-700 font-bold">
                        {site.name}
                      </span>
                    }
                    type="inner"
                    extra={
                      <Button
                        type="link"
                        size="small"
                        icon="delete"
                        className="text-red-700"
                        onClick={() => {
                          props.client.mutate({
                            mutation: deleteSiteMutation,
                            variables: {
                              id: site.id,
                            },
                          })
                        }}
                      />
                    }
                  >
                    <Progress
                      className="mt-4"
                      percent={
                        (site.pages_aggregate.aggregate.count / 50) * 100
                      }
                      showInfo={false}
                      size="small"
                    />
                    <p className="text-gray-500 m-0 text-xs">
                      {site.pages_aggregate.aggregate.count} pages used out of
                      50
                    </p>
                  </Card>
                </Link>
              </Col>
            )
          }
        )}
      </Row>
    </Fragment>
  )
}

export default withApollo(SitesIndex)
