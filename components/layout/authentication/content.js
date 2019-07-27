import React, { Component } from 'react'
import { Card, Tabs } from 'antd'
import Link from 'next/link'

import Illustration from '../../../static/images/authentication-illustration.png'
import Logo from '../../../static/images/logo.svg'
import SignIn from '../../authentication/sign-in'
import SignUp from '../../authentication/sign-up'

class ContentComponent extends Component {
  render() {
    return (
      <div className="flex min-h-screen">
        <div className="w-0 md:w-0 lg:w-2/3 flex items-center justify-center">
          <img
            src={Illustration}
            className="max-w-full max-h-screen"
            alt="Illustration"
          />
        </div>
        <div className="w-full md:w-full lg:w-1/3">
          <Card className="h-screen overflow-y-scroll">
            <div className="flex justify-center mt-16">
              <div className="w-2/3">
                <div className="mb-2">
                  <Link href={`/`} as={`/`}>
                    <a>
                      <img src={Logo} className="w-20" />
                    </a>
                  </Link>
                </div>
                <div className="text-2xl text-gray-700 mb-8">
                  Monitor the performance of your application
                </div>
                <Tabs
                  defaultActiveKey="signIn"
                  onChange={key => console.log(key)}
                >
                  <Tabs.TabPane tab="Sign In" key="signIn">
                    <SignIn />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Sign Up" key="signUp">
                    <SignUp />
                  </Tabs.TabPane>
                </Tabs>
                {this.props.children}
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default ContentComponent
