import { React } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function RecipeSearchResult(
  {
    id, image, title,
  },
) {
  return (
    <Card style={{ width: '18rem' }} className="shadow-sm result-card">
      <Card.Img
        variant="top"
        src={image}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        alt={title}
        className="recipe-image"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Link href={`recipe/${id}`} className="stretched-link links">See Recipe</Card.Link>
      </Card.Body>
    </Card>
  );
}
RecipeSearchResult.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeSearchResult;
