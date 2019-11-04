import React, { useState } from 'react'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import AutoComplete from 'antd/lib/auto-complete'
import Router from 'next/router'
import Link from 'next/link'
import Gravatar from 'react-gravatar'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const SEARCH_SITE_QUERY = gql`
  query($query: String) {
    site(where: { name: { _ilike: $query } }) {
      id
      name
    }
  }
`

const AuthenticatedLayoutHeader = ({
  email,
  router,
}: {
  email: string
  router: any
}) => {
  const { Header } = Layout
  const { Option } = AutoComplete
  const [queryResults, setQueryResults] = useState([])

  const handleSignOut = () => {
    document.cookie = `userId=`
    document.cookie = `email=`
    document.cookie = `token=`

    Router.push('/authentication')
  }

  const handleSearch = async (query: any) => {
    const res = await useQuery(SEARCH_SITE_QUERY, {
      variables: {
        query: `%${query}%`,
      },
      fetchPolicy: 'network-only',
    })

    const matchedSites =
      res &&
      res.data &&
      res.data.site.map((s: any) => ({
        id: s.id,
        name: s.name,
      }))

    if (!query) {
      setQueryResults([])
    } else {
      setQueryResults(matchedSites)
    }
  }

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <div className="flex justify-between h-full border border-solid border-gray-300">
        <div className="mx-4 flex">
          <Link href={`/dashboard`} as={`/dashboard`}>
            <a>perfy</a>
          </Link>
          <div className="px-4">
            <AutoComplete
              dataSource={queryResults}
              style={{ width: 500 }}
              size="large"
              onSelect={siteId => {
                router.push(`/sites/[siteId]?id=${siteId}`, `/sites/${siteId}`)
              }}
              onSearch={value => handleSearch(value)}
              placeholder="Search for a site"
              optionLabelProp="name"
            >
              {queryResults.map((site: any) => (
                <Option key={site.id} value={site.id}>
                  {site.name}
                </Option>
              ))}
            </AutoComplete>
          </div>
        </div>
        <div className="mx-4 flex">
          <div className="px-4">
            <Icon type="notification" />
          </div>
          <div className="px-4">
            <Icon type="setting" />
          </div>
          <div className="px-4">
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button type="primary" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link block h-16" href="#">
                <Gravatar email={email} size={30} className="rounded-full" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default withRouter(AuthenticatedLayoutHeader)
