import { React, useEffect, useState } from 'react';

function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then((response) => response.json())
      .then((data) => { setSales(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-3">Sales</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Discount Price</th>
            <th scope="col">Salesperson</th>
            <th scope="col">Commission</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(
            (sale) => (
              <tr>
                <th scope="row">{sale.product}</th>
                <td>{sale.customer}</td>
                <td>{sale.date}</td>
                <td>{`$${(Math.round(sale.price * 100) / 100).toString()}`}</td>
                <td>{`$${(Math.round(sale.discount_price * 100) / 100).toString()}`}</td>
                <td>{sale.salesperson}</td>
                <td>{`$${(Math.round(sale.commission * 100) / 100).toString()}`}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage;
