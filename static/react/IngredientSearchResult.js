import { React } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function IngredientSearchResult(
  {
    id, image, name,
  },
) {
  return (
    <Card style={{ width: '18rem' }} className="shadow-sm result-card">
      <Card.Img
        variant="top"
        src={`https://spoonacular.com/cdn/ingredients_250x250/${image}`}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        alt={name}
        class="ingredient-image"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Link href={`ingredient/${id}`} className="stretched-link links">See Ingredient</Card.Link>
      </Card.Body>
    </Card>
  );
}

IngredientSearchResult.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientSearchResult;
