import { React, useEffect, useState } from 'react';
import Customer from './Customer';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => { setCustomers(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-3">Customers</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(
            (c) => (
              <Customer
                id={c.id}
                first_name={c.first_name}
                last_name={c.last_name}
                address={c.address}
                phone={c.phone}
                start_date={c.start_date}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersPage;
