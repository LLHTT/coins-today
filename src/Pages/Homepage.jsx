import React, { Suspense } from 'react'
import Banner from '../components/Banner/Banner'
const CoinsTable = React.lazy(() => import('../components/CoinsTable'))

function Homepage() {
  return (
    <>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <CoinsTable />
      </Suspense>
    </> 
  )
}

export default Homepage
