import React from 'react'
import { Menu, Icon } from 'antd'
import { withApollo, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Loader from '../../../common/loader'

const fetchProjectsQuery = gql`
  query {
    project {
      id
      name
    }
  }
`

const ProjectsMenu = () => {
  const { data, loading, error } = useQuery(fetchProjectsQuery)

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={({ key }) => Router.push(key)}
    >
      <Menu.SubMenu
        key="/projects"
        title={
          <span>
            <Icon type="project" />
            <span>Projects</span>
          </span>
        }
        onTitleClick={({ key }) => Router.push(key)}
      >
        {!!data.project &&
          data.project.map((project: {
            id: string,
            name: string
          }) => {
            return (
              <Menu.Item key={`/projects/${project.id}`}>
                <span>{project.name}</span>
              </Menu.Item>
            )
          })}
      </Menu.SubMenu>
    </Menu>
  )
}

export default withApollo(ProjectsMenu)
