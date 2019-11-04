import React from 'react'
import PropTypes from 'prop-types'

const AuthenticatedLayoutContent = ({ children }: { children: any }) => {
  return (
    <div style={{ height: 'calc(100vh - 65px)' }}>
      <div className="my-0 mx-auto">{children}</div>
    </div>
  )
}

AuthenticatedLayoutContent.propTypes = {
  children: PropTypes.node,
}

export default AuthenticatedLayoutContent
