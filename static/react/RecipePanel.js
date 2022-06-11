/* eslint-disable react/jsx-indent */
import { React } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function RecipePanel(
  { id, title, imgSrc },
) {
  return (
    <Card style={{ width: '25rem' }} className="shadow-sm result-card">
      <Card.Img
        variant="top"
        src={imgSrc}
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

RecipePanel.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default RecipePanel;
