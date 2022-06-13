import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function SalespersonUpdatePage() {
  // eslint-disable-next-line prefer-const
  const [salesperson, setSalesperson] = useState('');
  const [results, setResults] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(`/api/salesperson/${searchParams.get('id')}`)
      .then((response) => response.json())
      .then((data) => { setSalesperson(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  function handleFirstNameInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.first_name = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handleLastNameInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.last_name = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handleAddressInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.address = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handlePhoneInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.phone = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handleStartDateInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.start_date = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handleTerminationDateInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.termination_date = e.target.value;
    setSalesperson(newSalesperson);
  }
  function handleManagerInput(e) {
    const newSalesperson = JSON.parse(JSON.stringify(salesperson));
    newSalesperson.manager = e.target.value;
    setSalesperson(newSalesperson);
  }

  function updateSalesperson() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(salesperson),
    };
    fetch('/api/salesperson/update/', requestOptions)
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
                Salesperson ID:
                {` ${searchParams.get('id')}`}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                First name:
                <Form.Control type="text" value={salesperson.first_name} size="lg" onChange={handleFirstNameInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Last name:
                <Form.Control type="text" value={salesperson.last_name} size="lg" onChange={handleLastNameInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Address:
                <Form.Control type="text" size="lg" value={salesperson.address} onChange={handleAddressInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Phone:
                <Form.Control size="lg" type="text" value={salesperson.phone} onChange={handlePhoneInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Start Date:
                <Form.Control size="lg" type="text" value={salesperson.start_date} onChange={handleStartDateInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Termination Date:
                <Form.Control size="lg" type="text" value={salesperson.termination_date} onChange={handleTerminationDateInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <Form.Group>
                Manager:
                <Form.Control size="lg" type="text" value={salesperson.manager} onChange={handleManagerInput} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 3 }} className="mb-3">
              <Button size="lg" type="submit" onClick={updateSalesperson}>Save Changes</Button>
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

export default SalespersonUpdatePage;
