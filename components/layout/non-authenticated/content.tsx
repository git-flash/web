import React, { Component } from 'react'
import Card from 'antd/lib/card'
import Tabs from 'antd/lib/tabs'
import Link from 'next/link'

import SignIn from '../../authentication/sign-in'
import SignUp from '../../authentication/sign-up'

class NonAuthenticatedLayoutContent extends Component {
  render() {
    return (
      <div className="flex min-h-screen">
        <div className="w-full md:w-full lg:w-1/3">
          <Card className="h-screen overflow-y-scroll">
            <div className="flex justify-center mt-16">
              <div className="w-2/3">
                <div className="mb-2">
                  <Link href={`/`} as={`/`}>
                    <a>perfy</a>
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

export default NonAuthenticatedLayoutContent
