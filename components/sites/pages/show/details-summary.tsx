import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Card from 'antd/lib/card'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dynamic from 'next/dynamic'

import Loader from '../../../common/loader'
import chartConfig from '../../../../public/static/configs/chart.json'

dayjs.extend(LocalizedFormat)

const FETCH_PAGE_DETAILS_QUERY = gql`
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

const DetailsSummary = (props: any) => {
  const { data, loading, error } = useQuery(FETCH_PAGE_DETAILS_QUERY, {
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  const ReactApexChart = dynamic(() => import('react-apexcharts'))

  const performanceScore = page_by_pk.audits.map((audit: any) =>
    Math.round(audit.categories_performance_score * 100)
  )

  const seoScore = page_by_pk.audits.map((audit: any) =>
    Math.round(audit.categories_seo_score * 100)
  )

  const bestPracticesScore = page_by_pk.audits.map((audit: any) =>
    Math.round(audit.categories_best_practices_score * 100)
  )

  const accessibilityScore = page_by_pk.audits.map((audit: any) =>
    Math.round(audit.categories_accessibility_score * 100)
  )

  const fetchTimes = page_by_pk.audits.map((audit: any) => audit.fetch_time)

  const calculateScorePercentage = (firstScore: number, lastScore: number) => {
    if (firstScore === lastScore) return `0%`

    if (firstScore < lastScore)
      return `- ${Math.round(lastScore / firstScore) / 100}%`

    return `+ ${Math.round(firstScore / lastScore) / 100}%`
  }

  const calculateScoreColor = (firstScore: number, lastScore: number) => {
    if (firstScore === lastScore) return '#2b6cb0'

    if (firstScore > lastScore) return '#2f855a'

    return '#c53030'
  }

  const calculateScoreIcon = (firstScore: number, lastScore: number) => {
    if (firstScore === lastScore) return <Icon type="dash" />

    if (firstScore > lastScore) return <Icon type="caret-up" />

    return <Icon type="caret-down" />
  }

  const chartNode = (key: string, score: number) => {
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
    return <div />
  }

  return (
    <Row gutter={32}>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow rounded" style={{ minHeight: '170px' }}>
          <div className="uppercase text-gray-500 text-center font-semibold mb-2">
            Performance
          </div>
          <div className="text-black text-4xl text-center mb-2">
            {Math.round(
              page_by_pk.audits[0].categories_performance_score * 100
            )}
          </div>
          <div
            style={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_performance_score,
                page_by_pk.audits[1].categories_performance_score
              ),
            }}
            className="font-semibold text-center mb-4 text-sm"
          >
            {calculateScorePercentage(
              page_by_pk.audits[0].categories_performance_score,
              page_by_pk.audits[1].categories_performance_score
            )}
            <span className="ml-2">
              {calculateScoreIcon(
                page_by_pk.audits[0].categories_performance_score,
                page_by_pk.audits[1].categories_performance_score
              )}
            </span>
          </div>
          {chartNode('Performance', performanceScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow rounded" style={{ minHeight: '170px' }}>
          <div className="uppercase text-gray-500 text-center font-semibold mb-2">
            SEO
          </div>
          <div className="text-black text-4xl text-center mb-2">
            {Math.round(page_by_pk.audits[0].categories_seo_score * 100)}
          </div>
          <div
            style={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_seo_score,
                page_by_pk.audits[1].categories_seo_score
              ),
            }}
            className="font-semibold text-center mb-4 text-sm"
          >
            {calculateScorePercentage(
              page_by_pk.audits[0].categories_seo_score,
              page_by_pk.audits[1].categories_seo_score
            )}
            <span className="ml-2">
              {calculateScoreIcon(
                page_by_pk.audits[0].categories_seo_score,
                page_by_pk.audits[1].categories_seo_score
              )}
            </span>
          </div>
          {chartNode('SEO', seoScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow rounded" style={{ minHeight: '170px' }}>
          <div className="uppercase text-gray-500 text-center font-semibold mb-2">
            Best Practices
          </div>
          <div className="text-black text-4xl text-center mb-2">
            {Math.round(
              page_by_pk.audits[0].categories_best_practices_score * 100
            )}
          </div>
          <div
            style={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_best_practices_score,
                page_by_pk.audits[1].categories_best_practices_score
              ),
            }}
            className="font-semibold text-center mb-4 text-sm"
          >
            {calculateScorePercentage(
              page_by_pk.audits[0].categories_best_practices_score,
              page_by_pk.audits[1].categories_best_practices_score
            )}
            <span className="ml-2">
              {calculateScoreIcon(
                page_by_pk.audits[0].categories_best_practices_score,
                page_by_pk.audits[1].categories_best_practices_score
              )}
            </span>
          </div>
          {chartNode('Best Practices', bestPracticesScore)}
        </Card>
      </Col>
      <Col sm={24} md={12} lg={6}>
        <Card className="shadow rounded" style={{ minHeight: '170px' }}>
          <div className="uppercase text-gray-500 text-center font-semibold mb-2">
            Accessibility
          </div>
          <div className="text-black text-4xl text-center mb-2">
            {Math.round(
              page_by_pk.audits[0].categories_accessibility_score * 100
            )}
          </div>
          <div
            style={{
              color: calculateScoreColor(
                page_by_pk.audits[0].categories_accessibility_score,
                page_by_pk.audits[1].categories_accessibility_score
              ),
            }}
            className="font-semibold text-center mb-4 text-sm"
          >
            {calculateScorePercentage(
              page_by_pk.audits[0].categories_accessibility_score,
              page_by_pk.audits[1].categories_accessibility_score
            )}
            <span className="ml-2">
              {calculateScoreIcon(
                page_by_pk.audits[0].categories_accessibility_score,
                page_by_pk.audits[1].categories_accessibility_score
              )}
            </span>
          </div>
          {chartNode('Accessibility', accessibilityScore)}
        </Card>
      </Col>
    </Row>
  )
}

export default DetailsSummary
