import React, { Suspense } from 'react'
import ProductList from './_components/ProductList'

const page = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
        <ProductList/>
    </Suspense>
  )
}

export default page