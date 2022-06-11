/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import RecipePanel from './RecipePanel';

function RecommendationPage() {
  const [cuisine, setCuisine] = useState('Chinese');
  const [dishType, setDishType] = useState('main course');
  const [recipeDataList, setRecipeDataList] = useState([]);

  // handle for cuisine change from input box
  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  // handle for dishType change from input box
  const handleDishTypeChange = (e) => {
    setDishType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault('');
    fetch('/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line quote-props
      body: JSON.stringify({ 'cuisine': cuisine, 'dish_type': dishType }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRecipeDataList([...response]);
      });
  };

  const handleLike = (e, isLike) => {
    e.preventDefault('');
    fetch('/likeEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line quote-props
      body: JSON.stringify({ 'like': isLike, 'id_list': recipeDataList.map((x) => x.id.toString()) }),
    })
      .then((response) => response.json());
  };

  return (
    <Stack gap={3}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Cuisine</Form.Label>
            <Form.Select id="cuisines" onChange={(e) => handleCuisineChange(e)} data-testid="cuisines">
              <option value="Chinese">Chinese</option>
              <option value="American">American</option>
              <option value="Japanese">Japanese</option>
              <option value="Spanish">Spanish</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Dish Type</Form.Label>
            <Form.Select id="dish_types" onChange={(e) => handleDishTypeChange(e)} data-testid="dish_types">
              <option value="main course">main course</option>
              <option value="breakfast">breakfast</option>
              <option value="appetizer">appetizer</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Ready to get today's Recommendation?</Form.Label>
            <Form.Control type="submit" value="Click Me!" />
          </Col>
        </Row>
      </Form>
      <Container>
        <Row>
          {
            recipeDataList.map((recipeData, idx) => (
              <Col key={idx}>
                <RecipePanel id={recipeData.id} title={recipeData.title} imgSrc={recipeData.image} />
              </Col>
            ))
          }
        </Row>
      </Container>
      <Stack gap={2} direction="horizontal" className="col-md-2 mx-auto">
        <Button variant="success" onClick={(e) => handleLike(e, true)}>Like!</Button>
        <Button variant="danger" onClick={(e) => handleLike(e, false)}>Dislike!</Button>
      </Stack>
    </Stack>
  );
}

export default RecommendationPage;
