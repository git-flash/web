import React from 'react'
import Spin from 'antd/lib/spin'
import Icon from 'antd/lib/icon'

const Loader = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Spin
        tip="Loading..."
        size="large"
        indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}
      />
    </div>
  )
}

export default Loader
