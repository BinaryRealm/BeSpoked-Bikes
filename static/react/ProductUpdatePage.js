import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function ProductUpdatePage() {
  // eslint-disable-next-line prefer-const
  const [product, setProduct] = useState('');
  const [results, setResults] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    fetch(`/api/product/${searchParams.get('id')}`)
      .then((response) => response.json())
      .then((data) => { setProduct(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  function handleNameInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.name = e.target.value;
    setProduct(newProduct);
  }
  function handleManufacturerInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.manufacturer = e.target.value;
    setProduct(newProduct);
  }
  function handleStyleInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.style = e.target.value;
    setProduct(newProduct);
  }
  function handlePurchasePriceInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.purchase_price = e.target.value;
    setProduct(newProduct);
  }
  function handleSalePriceInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.sale_price = e.target.value;
    setProduct(newProduct);
  }
  function handleQtyOnHandInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.qty_on_hand = e.target.value;
    setProduct(newProduct);
  }
  function handleCommissionPercentageInput(e) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.commission_percentage = e.target.value;
    setProduct(newProduct);
  }

  function updateProduct() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    };
    fetch('/api/product/update/', requestOptions)
      .then((response) => response.json())
      .then((data) => { setResults(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }

  return (
    <div>
      <Container className="mt-5 mb-4">
        <Form as="div">
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <h5>
                Product ID:
                {` ${searchParams.get('id')}`}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Name:
                <Form.Control size="lg" type="text" value={product.name} onChange={handleNameInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Manufacturer:
                <Form.Control size="lg" type="text" value={product.manufacturer} onChange={handleManufacturerInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Style:
                <Form.Control size="lg" type="text" value={product.style} onChange={handleStyleInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Purchase Price:
                <Form.Control size="lg" type="text" value={product.purchase_price} onChange={handlePurchasePriceInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Sale Price:
                <Form.Control size="lg" type="text" value={product.sale_price} onChange={handleSalePriceInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Qty On Hand:
                <Form.Control size="lg" type="text" value={product.qty_on_hand} onChange={handleQtyOnHandInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Commission Percentage:
                <Form.Control size="lg" type="text" value={product.commission_percentage} onChange={handleCommissionPercentageInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 3 }} className="mb-3">
              <Button type="submit" size="lg" onClick={updateProduct}>Save Changes</Button>
            </Col>
            <Col className="mt-3">
              <h5>{results}</h5>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default ProductUpdatePage;
