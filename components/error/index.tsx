import React from 'react'
import Spin from 'antd/lib/spin'
import Icon from 'antd/lib/icon'

const ErrorPage = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Spin
        className="text-gray-500 text-xl"
        tip="Oops! Page not found"
        size="large"
        indicator={<Icon type="warning" style={{}} />}
      />
    </div>
  )
}

export default ErrorPage
