import React from 'react'
import { Spin, Icon } from 'antd';

const Loader = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Spin
        tip="Loading..."
        size="large"
        indicator={
          <Icon type="loading" style={{ fontSize: 30 }} spin />
        }
      />
    </div >
  )
}

export default Loader
