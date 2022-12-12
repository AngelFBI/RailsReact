import React from 'react'

import Header from '../components/shared/Header'
import Jumbotron from '../components/products/Jumbotron'
import ProductList from './ProductsContainer'
import Footer from '../components/shared/Footer'

const App = () => (
  <>
    <div>App Component</div>
    <Header />
    <Jumbotron />
    <ProductList />
    <Footer />
  </>
)

export default App
