import React from "react";
import { Form, Table } from "semantic-ui-react";
import axios from "axios";

const cities = [
  "Sandy",
  "Draper",
  "SLC",
  "Orem",
  "Provo",
  "Ogden",
  "Layton",
  "Midvale",
  "Murray",
];

const options = cities.map((c) => {
  return { key: c, text: c, value: c };
});

class Cities extends React.Component {
  state = { city: null, properties: [], page: 1, total_pages: 0 };

  handleChange = (e, { value }) => {

    // const setState = (obj, cb) => {

    // }

    this.setState({ city: value, properties: [], page: 1 }, () => {
      this.getProperties();
    });
  };

  getProperties = () => {
    const { city, properties, page } = this.state;
    axios.get(`/api/cities/${city}?page=${page}`).then((res) => {
      const { properties, total_pages } = res.data;
      this.setState({
        properties: [...properties],
        total_pages,
        page: page,
      });
    });
  };
  renderPagination = () => {
    const { total_pages, page } = this.state;
    const pages = [];
    for (let i = 1; i <= total_pages; i++) {
      pages.push(
        <span
          style={{
            cursor:'pointer',
            marginRight: "10px",
            textDecoration: page === i ? "underline" : "",
          }}
          onClick={ () => this.setState({page: i}, this.getProperties )}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  render() {
    const { page, total_pages, properties } = this.state;
    return (
      <div>
        <Form.Select options={options} onChange={this.handleChange} />
        {this.renderPagination()}
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Beds</Table.HeaderCell>
              <Table.HeaderCell>Baths</Table.HeaderCell>
              <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {properties.map((p) => (
              <Table.Row key={p.id}>
                <Table.Cell>${p.price}</Table.Cell>
                <Table.Cell>{p.beds}</Table.Cell>
                <Table.Cell>{p.baths}</Table.Cell>
                <Table.Cell>{p.sq_ft}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Cities;
