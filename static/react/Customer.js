/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { React } from 'react';

function Customer(
  {
    id, first_name, last_name, address, phone, start_date,
  },
) {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{start_date}</td>
    </tr>
  );
}

export default Customer;
