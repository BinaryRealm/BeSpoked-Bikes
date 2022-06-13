import { React, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

function ReportPage() {
  const [year, setYear] = useState(null);
  const [quarter, setQuarter] = useState(null);
  const [salespersons, setSalespersons] = useState([]);
  const [salesperson, setSalesperson] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    fetch('/api/salespersons')
      .then((response) => response.json())
      .then((data) => { setSalespersons(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  const yearOptions = [];
  for (let i = 2022; i >= 2000; i -= 1) {
    yearOptions.push({ value: i, label: i });
  }

  const quarterOptions = [
    { value: 1, label: 'Q1' },
    { value: 2, label: 'Q2' },
    { value: 3, label: 'Q3' },
    { value: 4, label: 'Q4' },
  ];

  const salespersonOptions = salespersons.map(
    (s) => (
      { value: s.id, label: `[id:${s.id}] ${s.first_name} ${s.last_name}` }
    ),
  );

  function getReport() {
    if (year === null || quarter === null || salesperson === null
      || year === undefined || quarter === undefined || salesperson === undefined) {
      setResults('All 3 fields must be selected!');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        salesperson_id: salesperson.value,
        year: year.value,
        quarter: quarter.value,
      }),
    };
    fetch('/report', requestOptions)
      .then((response) => response.json())
      .then((data) => { setResults(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }

  function handleResults() {
    if (results !== null && results.sales !== undefined && results.sales.length !== 0) {
      return (
        <div className="container">
          <h5 className="text-center mt-3">{`${year.value} Q${quarter.value} Sales for ${results.sales[0].salesperson}`}</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Discount Price</th>
                <th scope="col">Salesperson</th>
                <th scope="col">Commission</th>
              </tr>
            </thead>
            <tbody>
              {results.sales.map(
                (sale) => (
                  <tr>
                    <th scope="row">{sale.product}</th>
                    <td>{sale.customer}</td>
                    <td>{sale.date}</td>
                    <td>{`$${(Math.round(sale.price * 100) / 100).toString()}`}</td>
                    <td>{`$${(Math.round(sale.discount_price * 100) / 100).toString()}`}</td>
                    <td>{sale.salesperson}</td>
                    <td>{`$${(Math.round(sale.commission * 100) / 100).toString()}`}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <h5 className="text-center mt-5">
            Total bonus &#40;Sum of commissions&#41;:
            <p>{`$${(Math.round(results.bonus * 100) / 100).toString()}`}</p>
          </h5>
        </div>
      );
    }
    return (
      <h5 className="text-center mt-5">
        {results}
      </h5>
    );
  }
  return (
    <div>
      <Container>
        <Form as="div">
          <Row>
            <Col sm={{ span: 6, offset: 4 }} className="mt-5 mb-3">
              <h5>
                Generate a Quarterly Commission Report
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 4 }} className="mb-5">
              <Form.Label>Salesperson</Form.Label>
              <Select
                defaultValue={salesperson}
                onChange={setSalesperson}
                options={salespersonOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 4 }} className="mb-5">
              Year
              <Select
                defaultValue={year}
                onChange={setYear}
                options={yearOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 4, offset: 4 }} className="mb-5">
              Quarter
              <Select
                defaultValue={quarter}
                onChange={setQuarter}
                options={quarterOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 4 }} className="mb-5">
              <Button type="submit" size="md" onClick={getReport}>Generate Report</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Row>
          <Col>
            {handleResults()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ReportPage;
