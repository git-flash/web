import React, { Component, Fragment } from 'react'
import { Row, Col, Button, Card, Icon } from 'antd'
import Link from 'next/link'

import Illustration1 from '../../../static/images/landing-page-illustration-1.png'
import Illustration2 from '../../../static/images/landing-page-illustration-2.png'
import Logo from '../../../static/images/logo.svg'

class LandingPage extends Component {
  render() {
    return (
      <Fragment>
        <section className="px-16 pt-16 pb-48 max-w-6xl my-0 mx-auto">
          <Row>
            <Col sm={24} md={14}>
              <h1 className="text-5xl text-black font-bold mb-2">
                Log. Measure. Optimize.
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                Monitor the performance of your application
              </p>
              <p className="text-base text-gray-600 mb-12">
                Measure the performance of your app over time. Act upon the data
                provided in our beautiful dashboard. Iterate and enhance your
                application.
              </p>
              <Button
                type="primary"
                icon="file-done"
                size="large"
                className="w-40 uppercase text-sm font-semibold"
              >
                Know More
              </Button>
            </Col>
            <img
              className="w-0 md:w-auto lg:w-auto"
              src={Illustration1}
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
        <section className="px-16 py-32 bg-gray-100">
          <div className="max-w-6xl my-0 mx-auto">
            <Row type="flex" justify="center">
              <Col span={24}>
                <h1 className="text-4xl text-black font-base mb-2 text-center">
                  Packed with important Features
                </h1>
                <p className="text-xl mb-16 text-center">
                  Perfy uses Google Lighthouse to generate performance reports
                </p>
                <Row gutter={16}>
                  <Col sm={24} md={12} lg={12}>
                    <div className="mb-8">
                      <Card>
                        <Row
                          type="flex"
                          justify="space-around"
                          align="middle"
                          gutter={32}
                        >
                          <Col sm={4} md={4} lg={4}>
                            <div>
                              <Icon
                                type="security-scan"
                                style={{ fontSize: '50px' }}
                                twoToneColor="#2196f3"
                                theme="twoTone"
                              />
                            </div>
                          </Col>
                          <Col sm={20} md={20} lg={20}>
                            <div className="text-lg font-semibold text-black mb-2">
                              Run audits on your app
                            </div>
                            <div className="text-base">
                              Run performance audits on schedule and generate
                              benchmarking data.
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                  <Col sm={24} md={12} lg={12}>
                    <div className="mb-8">
                      <Card>
                        <Row
                          type="flex"
                          justify="space-around"
                          align="middle"
                          gutter={32}
                        >
                          <Col sm={4} md={4} lg={4}>
                            <div>
                              <Icon
                                type="file-markdown"
                                twoToneColor="#2196f3"
                                theme="twoTone"
                                style={{ fontSize: '50px' }}
                              />
                            </div>
                          </Col>
                          <Col sm={20} md={20} lg={20}>
                            <div className="text-lg font-semibold text-black mb-2">
                              Generate reports
                            </div>
                            <div className="text-base">
                              Generate reports from the audits, store and
                              analyze them over a period of time.
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col sm={24} md={12} lg={12}>
                    <div className="mb-8">
                      <Card>
                        <Row
                          type="flex"
                          justify="space-around"
                          align="middle"
                          gutter={32}
                        >
                          <Col sm={4} md={4} lg={4}>
                            <div>
                              <Icon
                                type="reconciliation"
                                style={{ fontSize: '50px' }}
                                twoToneColor="#2196f3"
                                theme="twoTone"
                              />
                            </div>
                          </Col>
                          <Col sm={20} md={20} lg={20}>
                            <div className="text-lg font-semibold text-black mb-2">
                              Visualize with screenshots
                            </div>
                            <div className="text-base">
                              See screenshots to check when your page is
                              rendering and compare benchmarks.
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                  <Col sm={24} md={12} lg={12}>
                    <div className="mb-8">
                      <Card>
                        <Row
                          type="flex"
                          justify="space-around"
                          align="middle"
                          gutter={32}
                        >
                          <Col sm={4} md={4} lg={4}>
                            <div>
                              <Icon
                                type="build"
                                style={{ fontSize: '50px' }}
                                twoToneColor="#2196f3"
                                theme="twoTone"
                              />
                            </div>
                          </Col>
                          <Col sm={20} md={20} lg={20}>
                            <div className="text-lg font-semibold text-black mb-2">
                              Compare audits
                            </div>
                            <div className="text-base">
                              Create charts and compare them using our audits
                              visualizer.
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        <section className="px-16 py-32 max-w-6xl my-0 mx-auto">
          <Row type="flex" justify="end">
            <img
              className="w-0 md:w-auto lg:w-auto"
              src={Illustration2}
              style={{
                position: 'absolute',
                left: 0,
                marginTop: '-150px',
                marginLeft: '-50px',
                maxWidth: '950px',
              }}
              alt="Illustration"
            />
            <Col sm={24} md={12}>
              <h2 className="text-4xl text-black font-base mb-2">
                Measure performance logs
              </h2>
              <p className="text-xl mb-16">
                Create on-demand or schedule generation of audits for your app
              </p>
              <div className="mb-12">
                <p className="text-base">
                  <Icon
                    type="check-circle"
                    style={{ marginRight: '10px' }}
                    twoToneColor="#2196f3"
                    theme="twoTone"
                  />
                  Create a project with pages
                </p>
                <p className="text-base">
                  <Icon
                    type="check-circle"
                    style={{ marginRight: '10px' }}
                    twoToneColor="#2196f3"
                    theme="twoTone"
                  />
                  Schedule the generation of audits
                </p>
                <p className="text-base">
                  <Icon
                    type="check-circle"
                    style={{ marginRight: '10px' }}
                    twoToneColor="#2196f3"
                    theme="twoTone"
                  />
                  Compare the performance of pages over time
                </p>
              </div>
              <Button
                type="primary"
                icon="file-done"
                size="large"
                className="w-40 uppercase text-sm font-semibold"
              >
                Know More
              </Button>
            </Col>
          </Row>
        </section>
        <section className="px-16 py-32 bg-gray-100">
          <div className="max-w-6xl my-0 mx-auto">
            <Row type="flex" justify="start" gutter={32}>
              <Col sm={24} md={12} className="pb-16">
                <h2 className="text-4xl text-black font-base mb-2">
                  100% Open Source
                </h2>
                <p className="text-xl mb-16">
                  We believe that the best software is the one which is built
                  together
                </p>
                <Button
                  type="primary"
                  icon="file-done"
                  size="large"
                  className="w-40 uppercase text-sm font-semibold"
                >
                  Know More
                </Button>
              </Col>
              <Col sm={24} md={12}>
                <Card className="mb-8">
                  <Row
                    type="flex"
                    justify="space-around"
                    align="middle"
                    gutter={32}
                  >
                    <Col sm={4} md={4} lg={4}>
                      <div>
                        <Icon
                          type="trophy"
                          style={{ fontSize: '50px' }}
                          twoToneColor="#2196f3"
                          theme="twoTone"
                        />
                      </div>
                    </Col>
                    <Col sm={20} md={20} lg={20}>
                      <div className="text-lg font-semibold text-black mb-2">
                        Available on Github
                      </div>
                      <div className="text-base">
                        The whole source code is available on Github. Feel free
                        to fork it and push changes.
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Card>
                  <Row
                    type="flex"
                    justify="space-around"
                    align="middle"
                    gutter={32}
                  >
                    <Col sm={4} md={4} lg={4}>
                      <div>
                        <Icon
                          type="flag"
                          style={{ fontSize: '50px' }}
                          twoToneColor="#2196f3"
                          theme="twoTone"
                        />
                      </div>
                    </Col>
                    <Col sm={20} md={20} lg={20}>
                      <div className="text-lg font-semibold text-black mb-2">
                        MIT Licence
                      </div>
                      <div className="text-base">
                        All our source code has MIT license. We believe that
                        collaboration is very important for improvement.
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
        <section className="px-16 py-16 bg-black">
          <div className="flex justify-center h-full max-w-6xl my-0 mx-auto mb-12">
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/about`} as={`/about`}>
                <a>About</a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/privacy`} as={`/privacy`}>
                <a>Privacy</a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/legal`} as={`/legal`}>
                <a>Legal</a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/security`} as={`/security`}>
                <a>Security</a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/developers`} as={`/developers`}>
                <a>Developers</a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold uppercase">
              <Link href={`/support`} as={`/support`}>
                <a>Support</a>
              </Link>
            </div>
          </div>
          <div className="flex justify-center h-full max-w-6xl my-0 mx-auto text-white mb-12">
            © 2019. All rights reserved.
          </div>
          <div className="flex justify-center h-full max-w-6xl my-0 mx-auto">
            <div className="pr-4">
              <Link href={`/`} as={`/`}>
                <a>
                  <img
                    src={Logo}
                    className="pr-2"
                    alt="Perfy"
                    width="40px"
                    height="40px"
                  />
                </a>
              </Link>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default LandingPage
