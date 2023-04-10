'use client'

import Head from 'next/head'

type HeaderTypes = {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderTypes) => (
  <Head>
    <title>{title}</title>
    {children}
  </Head>
)

export default Header
