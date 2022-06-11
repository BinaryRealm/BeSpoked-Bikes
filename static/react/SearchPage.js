import { React, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import RecipeSearchResult from './RecipeSearchResult';
import IngredientSearchResult from './IngredientSearchResult';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Recipes');
  const [resultsLength, setResultsLength] = useState('10');
  const [results, setResults] = useState(null);

  function handleQueryInput(e) {
    setQuery(e.target.value);
  }

  function handleTypeInput(e) {
    setType(e.target.value);
  }

  function handleResultsLength(e) {
    setResultsLength(e.target.value);
  }

  function submitSearch() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, type, length: resultsLength }),
    };
    fetch('/search', requestOptions)
      .then((response) => response.json())
      .then((data) => { setResults(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }

  function handleResults() {
    if (results !== null) {
      if (results !== 'apierror') {
        if (results.length !== 0) {
          if (results[0].title) {
            return results.map(
              (result) => (
                <Col className="mb-4 d-flex align-items-stretch">
                  <RecipeSearchResult
                    key={result.id}
                    id={result.id}
                    image={result.image}
                    title={result.title}
                  />
                </Col>
              ),
            );
          }
          return results.map(
            (result) => (
              <Col className="mb-4 d-flex align-items-stretch">
                <IngredientSearchResult
                  key={result.id}
                  id={result.id}
                  image={result.image}
                  name={result.name}
                />
              </Col>
            ),
          );
        }
        return (<Col sm={{ span: 9, offset: 4 }}>No Search Results Found</Col>);
      }
      return (<Col sm={{ span: 9, offset: 4 }}>Something went wrong with API Request!</Col>);
    }
    return '';
  }

  return (
    <div>
      <Container className="mt-5 mb-4">
        <Form as="div">
          <Row>
            <Col sm={{ span: 10, offset: 0 }} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Search"
                  size="lg"
                  value={query}
                  onChange={(e) => handleQueryInput(e)}
                  data-testid="input-field"
                />
              </Form.Group>
            </Col>
            <Col className="mb-3">
              <Button type="submit" size="lg" onClick={submitSearch}>Search</Button>
            </Col>

          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 1 }} className="mb-3">
              <Form.Group>
                <Form.Check type="radio" label="Recipes" id="html" name="search_type" value="Recipes" defaultChecked onChange={(e) => handleTypeInput(e)} />
                <Form.Check type="radio" label="Ingredients" id="html" name="search_type" value="Ingredients" onChange={(e) => handleTypeInput(e)} />
              </Form.Group>
            </Col>
            <Col sm={{ span: 6, offset: 0 }} className="mb-3">
              <Form.Group>
                <Form.Select name="results-length" size="lg" onChange={(e) => handleResultsLength(e)} defaultValue="10">
                  <option value="5">5 Results</option>
                  <option value="10">10 Results</option>
                  <option value="20">20 Results</option>
                  <option value="50">50 Results</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="ml-1">
        <Row>
          {handleResults()}
        </Row>
      </Container>
    </div>
  );
}
export default SearchPage;
