import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo'
import Empty from 'antd/lib/empty'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dynamic from 'next/dynamic'

import Loader from '../../../common/loader'
import chartConfig from '../../../../public/static/configs/chart.json'

dayjs.extend(LocalizedFormat)

const FETCH_PERFORMANCE_SUBSCRIPTION = gql`
  subscription($id: uuid!) {
    page_by_pk(id: $id) {
      id
      audits(limit: 10, order_by: { fetch_time: desc }) {
        id
        categories_performance_score
        fetch_time
      }
    }
  }
`

const PerformanceChart = (props: any) => {
  const { data, loading, error } = useSubscription(
    FETCH_PERFORMANCE_SUBSCRIPTION,
    {
      variables: { id: props.id },
      fetchPolicy: 'network-only',
    }
  )

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { page_by_pk } = data

  const ReactApexChart = dynamic(() => import('react-apexcharts'))

  const scores = page_by_pk.audits.map((audit: any) =>
    Math.round(audit.categories_performance_score * 100)
  )

  const fetchTimes = page_by_pk.audits.map((audit: any) => audit.fetch_time)

  if (page_by_pk.audits.length < 2) {
    return (
      <div className="p-4">
        <Empty />
      </div>
    )
  }

  return (
    <div className="w-full">
      <ReactApexChart
        options={{
          ...chartConfig,
          xaxis: {
            categories: fetchTimes.reverse(),
            labels: {
              formatter: (value: string) => dayjs(value).format('MMM D'),
            },
          },
          yaxis: {
            min: 0,
            max: 100,
            labels: {
              formatter: (value: string) => value,
            },
          },
        }}
        series={[
          {
            name: 'Performance',
            data: scores.reverse(),
          },
        ]}
        type="area"
        height="300"
      />
    </div>
  )
}

export default PerformanceChart
