import React from 'react'
import AddProduct from '../components/add-Product/AddProduct';
import Helmet from '../components/Helmet/Helmet';

const Product = () => {
  return (
    <Helmet title="product">
      <section>
        <AddProduct />
      </section>
    </Helmet>
  );
}

export default Product