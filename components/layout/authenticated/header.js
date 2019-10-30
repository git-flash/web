import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Button, AutoComplete } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import Gravatar from 'react-gravatar'
import { graphql, withApollo, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

import Logo from '../../../static/images/logo.svg'

const searchSiteQuery = gql`
  query($query: String) {
    site(where: { name: { _ilike: $query } }) {
      id
      name
    }
  }
`

const AuthenticatedLayoutHeader = ({ email, client, router }) => {
  const { Header } = Layout
  const { Option } = AutoComplete
  const [queryResults, setQueryResults] = useState([])

  const handleSignOut = () => {
    document.cookie = `userId=`
    document.cookie = `email=`
    document.cookie = `token=`

    Router.push('/authentication')
  }

  const handleSearch = async query => {
    const res = await client.query({
      query: searchSiteQuery,
      variables: {
        query: `%${query}%`,
      },
    })

    const matchedSites =
      res &&
      res.data &&
      res.data.site.map(s => ({
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
            <a>
              <img
                src={Logo}
                className="px-2"
                alt="Perfy"
                width="40px"
                height="40px"
              />
            </a>
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
              {queryResults.map(site => (
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

AuthenticatedLayoutHeader.propTypes = {
  email: PropTypes.string,
}

export default withRouter(withApollo(AuthenticatedLayoutHeader))
