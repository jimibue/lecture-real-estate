import React from "react";
import axios from "axios";
import { List, Header, Table } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

class Available extends React.Component {
  state = { agents: [], page: 1, totalPages: 0 };
  async componentDidMount() {
    const res = await axios.get("/api/properties");
    // this.setState({res:res.data})
    const agents = this.normalizeData(res.data.properties)
    this.setState({ agents, totalPages: res.data.total_pages });
  }
  normalizeData= (data) => {
    //{ agent_id, first_name, last_name, email, phone, properties:[{}], }
    let agents = [];

    // getting all unique agent_ids
    let ids = [...new Set(data.map((d) => d.agent_id))];
    // let ids = [...new Set([1,2,3,4,5,6])]
    ids.forEach((id) => {
      // agents properties
      let properties = data.filter((d) => d.agent_id === id);
      // agent info
      let { agent_id, first_name, last_name, email, phone } = properties[0];
      let agentsProperties = properties.map((p) => {
        let { price, beds, baths, sq_ft, city, street, zip, id } = p;
        return { price, beds, baths, sq_ft, city, street, zip, id };
      });

      let details = {
        agent_id,
        first_name,
        last_name,
        email,
        phone,
        properties: agentsProperties,
      };
      agents.push(details);
    });
    return agents;
  };

  loadMore = async () => {
    console.log('called')
    const page = this.state.page + 1;
    const res = await axios.get(`/api/properties?page=${page}`);
    let agents = this.normalizeData(res.data.properties);
    this.setState({agents:[...this.state.agents, ...agents], page})
  };

  render() {
    const { agents, page, totalPages } = this.state;
    return (
      <List style={styles.scroller}>
        <InfiniteScroll
          pageStart={page}
          loadMore={this.loadMore}
          hasMore={page < totalPages}
          useWindow={false}
        >
          {agents.map((agent) => {
            let {
              agent_id,
              first_name,
              last_name,
              email,
              phone,
              properties,
            } = agent;
            return (
              <List.Item key={agent_id}>
                <List.Header>
                  {first_name} {last_name} - {email}
                </List.Header>
                <List.Item>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Beds</Table.HeaderCell>
                        <Table.HeaderCell>Baths</Table.HeaderCell>
                        <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                        <Table.HeaderCell>Street</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>ZIP</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {properties.map((p) => (
                        <Table.Row key={p.id}>
                          <Table.Cell>${p.price}</Table.Cell>
                          <Table.Cell>{p.beds}</Table.Cell>
                          <Table.Cell>{p.baths}</Table.Cell>
                          <Table.Cell>{p.sq_ft}</Table.Cell>
                          <Table.Cell>{p.street}</Table.Cell>
                          <Table.Cell>{p.city}</Table.Cell>
                          <Table.Cell>{p.zip}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </List.Item>
              </List.Item>
            );
          })}
        </InfiniteScroll>
      </List>
    );
  }
}
const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};
export default Available;
