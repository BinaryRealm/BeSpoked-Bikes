import { React, useEffect, useState } from 'react';
import Salesperson from './Salesperson';

function SalespersonsPage() {
  const [salespersons, setSalespersons] = useState([]);

  useEffect(() => {
    fetch('/api/salespersons')
      .then((response) => response.json())
      .then((data) => { setSalespersons(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-3">Salespersons</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Start Date</th>
            <th scope="col">Termination Date</th>
            <th scope="col">Manager</th>
          </tr>
        </thead>
        <tbody>
          {salespersons.map(
            (sp) => (
              <Salesperson
                id={sp.id}
                first_name={sp.first_name}
                last_name={sp.last_name}
                address={sp.address}
                phone={sp.phone}
                start_date={sp.start_date}
                termination_date={sp.termination_date}
                manager={sp.manager}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalespersonsPage;
