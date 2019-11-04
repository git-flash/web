import React from 'react'
import PropTypes from 'prop-types'

const StaticLayoutContent = ({ children }: { children: any }) => {
  return <div className="min-h-screen bg-white pt-16">{children}</div>
}

StaticLayoutContent.propTypes = {
  children: PropTypes.node,
}

export default StaticLayoutContent
