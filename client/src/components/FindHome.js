import React from "react";
import axios from "axios";
import { Form, List } from "semantic-ui-react";

export default class FindHome extends React.Component {
  state = { agents: [], agent: null, buyers: [], buyer: null, properties: [] };

  async componentDidMount() {
    const res = await axios.get("/api/agents");
    this.setState({ agents: res.data });
  }

  agentList = () => {
    const { agents } = this.state;
    return agents.map((agent) => {
      return {
        key: agent.id,
        text: `${agent.first_name} ${agent.last_name}`,
        value: agent.id,
      };
    });
  };
  getBuyer = (e, { value }) => {
    this.setState({ agent: value }, () => {
      axios.get(`/api/agents/${this.state.agent}`).then((res) => {
        this.setState({ buyers: res.data });
      });
    });
  };
  buyerList = () => {
    const { buyers } = this.state;
    return buyers.map((buyer) => {
      return {
        key: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`,
        value: buyer.id,
      };
    });
  };

  getProperties = (e, { value }) => {
    this.setState({ buyer: value }, () => {
      axios.get(`/api/buyers/${this.state.buyer}`).then((res) => {
        this.setState({ properties: res.data });
      });
    });
  };

  showProperties = () => {
    const { properties } = this.state;
    return properties.map((p) => {
      return (
        <List key={p.id}>
          <List.Content>
            <List.Header>
              ${p.price} - {p.sq_ft}
            </List.Header>
            <List.Description>{p.city}</List.Description>
          </List.Content>
        </List>
      );
    });
  };

  render() {
    // options =[{key,text,value},{key,text,value}]
    return (
      <div>
        <Form.Select
          label="agent"
          options={this.agentList()}
          onChange={this.getBuyer}
        />
        {this.state.agent && (
          <Form.Select
            label="buyer"
            options={this.buyerList()}
            onChange={this.getProperties}
          />
        )}
        {this.state.properties.length > 0 && this.showProperties()}
      </div>
    );
  }
}
