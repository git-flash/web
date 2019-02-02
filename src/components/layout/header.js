import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'
import styled from 'styled-components'

const { Header } = Layout
const StyledHeader = styled(Header)`
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledLogo = styled.div``
const StyledMenu = styled.div`
  display: flex;
`
const StyledMenuItem = styled.div`
  font-size: 16px;

  &:not(:last-child) {
    margin-right: 24px;
  }
`

class HeaderComponent extends Component {
  render() {
    return (
      <StyledHeader>
        <StyledLogo>Logo</StyledLogo>
        <StyledMenu>
          <StyledMenuItem>
            <Icon type="search" />
          </StyledMenuItem>
          <StyledMenuItem>
            <Icon type="bell" />
          </StyledMenuItem>
          <StyledMenuItem>
            <Icon type="smile" />
          </StyledMenuItem>
        </StyledMenu>
      </StyledHeader>
    )
  }
}

HeaderComponent.propTypes = {}

export default HeaderComponent
