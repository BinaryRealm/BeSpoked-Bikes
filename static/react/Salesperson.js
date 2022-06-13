/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

function Salesperson(
  {
    id, first_name, last_name, address, phone, start_date, termination_date, manager,
  },
) {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/salesperson?id=${id}`);
  };

  return (
    <tr onClick={() => handleRowClick()}>
      <th scope="row">{id}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{start_date}</td>
      <td>{termination_date}</td>
      <td>{manager}</td>
    </tr>
  );
}

export default Salesperson;
