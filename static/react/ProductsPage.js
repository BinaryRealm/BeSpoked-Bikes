import { React, useEffect, useState } from 'react';
import Product from './Product';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => { setProducts(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-3">Products</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Style</th>
            <th scope="col">Purchase Price</th>
            <th scope="col">Sale Price</th>
            <th scope="col">Qty On Hand</th>
            <th scope="col">Commision Percentage</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            (p) => (
              <Product
                id={p.id}
                name={p.name}
                manufacturer={p.manufacturer}
                style={p.style}
                purchase_price={`$${p.purchase_price}`}
                sale_price={`$${p.sale_price}`}
                qty_on_hand={p.qty_on_hand}
                commission_percentage={`${p.commission_percentage}%`}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
