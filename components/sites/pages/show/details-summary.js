import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { withApollo, useSubscription } from 'react-apollo'
import {
  Statistic,
  Table,
  Popover,
  PageHeader,
  Tabs,
  Icon,
  Row,
  Card,
  Col,
} from 'antd'

import Loader from '../../../common/loader'
import calculateProgress from '../../../../lib/calculate-progress'

const fetchPageDetailsSubscription = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      audits(limit: 2, order_by: { fetch_time: desc }) {
        id
        categories_performance_score
        categories_seo_score
        categories_best_practices_score
        categories_accessibility_score
        fetch_time
      }
    }
  }
`

const BestPracticesChart = props => {
  const { data, loading, error } = useSubscription(
    fetchPageDetailsSubscription,
    {
      variables: { id: props.id },
      fetchPolicy: 'network-only',
    }
  )

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  const calculateScorePercentage = (firstScore, lastScore) => {
    if (firstScore === lastScore) return `${Math.round(firstScore * 100)} (0 %)`

    if (firstScore < lastScore)
      return `${Math.round(firstScore * 100)} (${Math.round(
        lastScore / firstScore
      ) / 100} %)`

    return `${Math.round(firstScore * 100)} (${Math.round(
      firstScore / lastScore
    ) / 100} %)`
  }

  const calculateScoreColor = (firstScore, lastScore) => {
    if (firstScore === lastScore) return '#2b6cb0'

    if (firstScore > lastScore) return '#2f855a'

    return '#c53030'
  }

  const calculateScoreIcon = (firstScore, lastScore) => {
    if (firstScore === lastScore) return <Icon type="rocket" />

    if (firstScore > lastScore) return <Icon type="rise" />

    return <Icon type="fall" />
  }

  return (
    <Row gutter={32}>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg">
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-700 font-sm">
                Performance
              </div>
            }
            value={calculateScorePercentage(
              page_by_pk.audits[0].categories_performance_score,
              page_by_pk.audits[1].categories_performance_score
            )}
            valueStyle={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_performance_score,
                page_by_pk.audits[1].categories_performance_score
              ),
            }}
            prefix={calculateScoreIcon(
              page_by_pk.audits[0].categories_performance_score,
              page_by_pk.audits[1].categories_performance_score
            )}
          />
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg">
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-700 font-sm">
                SEO
              </div>
            }
            value={calculateScorePercentage(
              page_by_pk.audits[0].categories_seo_score,
              page_by_pk.audits[1].categories_seo_score
            )}
            valueStyle={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_seo_score,
                page_by_pk.audits[1].categories_seo_score
              ),
            }}
            prefix={calculateScoreIcon(
              page_by_pk.audits[0].categories_seo_score,
              page_by_pk.audits[1].categories_seo_score
            )}
          />
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg">
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-700 font-sm">
                Best Practices
              </div>
            }
            value={calculateScorePercentage(
              page_by_pk.audits[0].categories_best_practices_score,
              page_by_pk.audits[1].categories_best_practices_score
            )}
            valueStyle={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_best_practices_score,
                page_by_pk.audits[1].categories_best_practices_score
              ),
            }}
            prefix={calculateScoreIcon(
              page_by_pk.audits[0].categories_best_practices_score,
              page_by_pk.audits[1].categories_best_practices_score
            )}
          />
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg">
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-700 font-sm">
                Accessibility
              </div>
            }
            value={calculateScorePercentage(
              page_by_pk.audits[0].categories_accessibility_score,
              page_by_pk.audits[1].categories_accessibility_score
            )}
            valueStyle={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_accessibility_score,
                page_by_pk.audits[1].categories_accessibility_score
              ),
            }}
            prefix={calculateScoreIcon(
              page_by_pk.audits[0].categories_accessibility_score,
              page_by_pk.audits[1].categories_accessibility_score
            )}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default withApollo(BestPracticesChart)
