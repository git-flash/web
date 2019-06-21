import React, { Component, Fragment } from 'react'
import { Row, Col, Button, Card } from 'antd'

import Illustration from '../../../static/images/landing-page-illustration.png'

class LandingPage extends Component {
  render() {
    return (
      <Fragment>
        <section className="pt-32 pb-48 px-16 max-w-6xl my-0 mx-auto">
          <Row>
            <Col sm={24} md={12}>
              <h1 className="text-4xl text-black font-bold mb-2">
                Log. Measure. Optimize.
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Monitor the performance of your application
              </p>
              <p className="text-base text-gray-700 mb-12">
                Measure the performance of your app over time. Act upon the data
                provided in our beautiful dashboard. Iterate and enhance your
                application.
              </p>
              <Button type="primary" icon="file-done" size="large">
                Know More
              </Button>
            </Col>
            <img
              className="w-0 md:w-auto lg:w-auto"
              src={Illustration}
              style={{
                position: 'absolute',
                marginTop: '-150px',
                marginLeft: '-100px',
                maxWidth: '950px',
              }}
              alt="Illustration"
            />
          </Row>
        </section>
        <section className="py-32 bg-gray-100">
          <div className="max-w-6xl my-0 mx-auto px-16">
            <Row type="flex" justify="center">
              <Col span={24}>
                <h1 className="text-2xl text-black font-semibold mb-2 text-center">
                  Packed with important Features
                </h1>
                <p className="text-base text-gray-700 mb-16 text-center">
                  Perfy uses Google Lighthouse to generate performance reports
                </p>
                <Row gutter={16}>
                  <Col sm={24} md={12} lg={8}>
                    <Card title={<div className="text-lg">Audits</div>}>
                      Run performance audits on schedule and generate
                      benchmarking data
                    </Card>
                  </Col>
                  <Col sm={24} md={12} lg={8}>
                    <Card title={<div className="text-lg">Reports</div>}>
                      Generate reports from the audits, store and analyze them
                    </Card>
                  </Col>
                  <Col sm={24} md={12} lg={8}>
                    <Card title={<div className="text-lg">Screenshots</div>}>
                      See screenshots to check when your page is rendering
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        <section className="py-8 px-16 bg-black">
          <div className="max-w-6xl my-0 mx-auto">
            <Row type="flex" justify="space-between">
              <Col span={20}>
                <p className="text-white font-semibold mb-0">Perfy</p>
              </Col>
              <Col span={4}>Help</Col>
            </Row>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default LandingPage
