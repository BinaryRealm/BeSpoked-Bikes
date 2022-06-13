/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

function Product(
  {
    id, name, manufacturer, style, purchase_price, sale_price, qty_on_hand, commission_percentage,
  },
) {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/product?id=${id}`);
  };

  return (
    <tr onClick={() => handleRowClick()}>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{manufacturer}</td>
      <td>{style}</td>
      <td>{purchase_price}</td>
      <td>{sale_price}</td>
      <td>{qty_on_hand}</td>
      <td>{commission_percentage}</td>
    </tr>
  );
}

export default Product;
