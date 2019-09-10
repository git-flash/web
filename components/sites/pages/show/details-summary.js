import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { withApollo, useQuery } from 'react-apollo'
import {
  Statistic,
  Popover,
  PageHeader,
  Tabs,
  Icon,
  Row,
  Card,
  Col,
} from 'antd'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dynamic from 'next/dynamic'

import Loader from '../../../common/loader'
import calculateProgress from '../../../../lib/calculate-progress'
import chartConfig from '../../../../static/configs/chart.json'

dayjs.extend(LocalizedFormat)

const fetchPageDetailsQuery = gql`
  query($id: uuid!) {
    page_by_pk(id: $id) {
      id
      audits(limit: 10, order_by: { fetch_time: desc }) {
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

const DetailsSummary = props => {
  const { data, loading, error } = useQuery(fetchPageDetailsQuery, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  const ReactApexChart = dynamic(() => import('react-apexcharts'))

  const performanceScore = page_by_pk.audits.map(audit =>
    Math.round(audit.categories_performance_score * 100)
  )

  const seoScore = page_by_pk.audits.map(audit =>
    Math.round(audit.categories_seo_score * 100)
  )

  const bestPracticesScore = page_by_pk.audits.map(audit =>
    Math.round(audit.categories_best_practices_score * 100)
  )

  const accessibilityScore = page_by_pk.audits.map(audit =>
    Math.round(audit.categories_accessibility_score * 100)
  )

  const fetchTimes = page_by_pk.audits.map(audit => audit.fetch_time)

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

  const chartNode = (key, score) => {
    return (
      <div style={{ margin: '-10px -14px -56px' }}>
        <ReactApexChart
          options={{
            ...chartConfig,
            xaxis: {
              categories: fetchTimes,
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              min: 0,
              max: 100,
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            tooltip: {
              enabled: false,
            },
          }}
          series={[
            {
              name: key,
              data: score,
            },
          ]}
          type="area"
          height="100"
        />
      </div>
    )
  }

  if (page_by_pk.audits.length < 2) {
    return false
  }

  return (
    <Row gutter={32}>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg" style={{ minHeight: '170px' }}>
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-500 font-sm">
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
          {chartNode('Performance', performanceScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg" style={{ minHeight: '170px' }}>
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-500 font-sm">
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
          {chartNode('SEO', seoScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg" style={{ minHeight: '170px' }}>
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-500 font-sm">
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
          {chartNode('Best Practices', bestPracticesScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow-lg" style={{ minHeight: '170px' }}>
          <Statistic
            title={
              <div className="uppercase uppercase text-gray-500 font-sm">
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
          {chartNode('Accessibility', accessibilityScore)}
        </Card>
      </Col>
    </Row>
  )
}

export default withApollo(DetailsSummary)
