import { React, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

function CreateSalePage() {
  const [products, setProducts] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState(products[0]);
  const [salesperson, setSalesperson] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => { setProducts(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
    fetch('/api/salespersons')
      .then((response) => response.json())
      .then((data) => { setSalespersons(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => { setCustomers(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  const productOptions = products.map(
    (p) => (
      { value: p.id, label: `[id:${p.id}] ${p.name} (Qty: ${p.qty_on_hand})` }
    ),
  );

  const salespersonOptions = salespersons.map(
    (s) => (
      { value: s.id, label: `[id:${s.id}] ${s.first_name} ${s.last_name}` }
    ),
  );

  const customerOptions = customers.map(
    (c) => (
      { value: c.id, label: `[id:${c.id}] ${c.first_name} ${c.last_name}` }
    ),
  );

  function createSale() {
    if (product === null || salesperson === null || customer === null
      || product === undefined || salesperson === undefined || customer === undefined) {
      setResults('All 3 fields must be selected!');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.value,
        salesperson_id: salesperson.value,
        customer_id: customer.value,
      }),
    };
    fetch('/sale/new', requestOptions)
      .then((response) => response.json())
      .then((data) => { setResults(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }

  return (
    <div>
      <Container className="mt-5 mb-4">
        <Form as="div">
          <Row>
            <Col sm={{ span: 8, offset: 2 }} className="mb-5">
              <Form.Label>Product</Form.Label>
              <Select
                defaultValue={product}
                onChange={setProduct}
                options={productOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 2 }} className="mb-5">
              <Form.Label>Salesperson</Form.Label>
              <Select
                defaultValue={salesperson}
                onChange={setSalesperson}
                options={salespersonOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 2 }} className="mb-5">
              <Form.Label>Customer</Form.Label>
              <Select
                defaultValue={customer}
                onChange={setCustomer}
                options={customerOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 2 }} className="mb-3">
              <Button type="submit" size="md" onClick={createSale}>Create Sale</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Row>
          <Col sm={{ span: 4, offset: 2 }}>
            <h5>{results}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateSalePage;
