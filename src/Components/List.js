import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Button,
} from "reactstrap";
import "./index.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import axios from "axios";
class List extends React.Component {
  constructor() {
    super(...arguments);
    this.mediaQuery = "(min-width: 600px)";
    this.state = {
      filtered: [],
      searchStatus: 0,
      data: [],
    };
    this.enableDock = true;
    this.dockSize = "52px";
    this.width = "220px";
    this.target = ".main-content";
  }
  handleDelete(index) {
    var temp = this.state.data;
    var temp1 = temp[index]._id;
    axios.delete("/aliens/delete/" + temp1).then((res) => {
      if (res) {
        // console.log(res);
        this.componentDidMount();
      }
    });
  }
  //Function for handling Search operation
  handleChange(e) {
    var userInput = document.getElementsByName("searchInput")[0].value;
    var count = 0;
    const lData = [];
    const data = this.state.data;
    if (userInput !== "") {
      var regex = new RegExp(userInput, "i"); // Case Insensitive matching with user Input /<UserInput>/i
      {
        this.state.data.map((val) => {
          if ((val.name != null ? val.name : "").search(regex) !== -1) {
            const x = {
              name: val.name,
              tech: val.tech,
              sub: val.sub,
            };
            lData.push(x);
            count++;
          }
        });
      }
      this.setState({
        searchStatus: 1,
        filtered: lData,
      });
    } else {
      this.setState({
        searchStatus: 0,
      });
    }
  }
  addEmployee() {
    this.props.history.push("/Add");
  }
  componentDidMount() {
    axios.get("/aliens").then((res) => {
      console.log(res);
      this.setState({
        data: res.data,
      });
    });
  }
  render() {
    const x =
      this.state.searchStatus === 0 ? this.state.data : this.state.filtered;
    const tabledata =
      x.length === 0
        ? "No Data Found"
        : x.map((key, index) => {
            return (
              <tr>
                <td style={{ width: "20%" }}>{key.name}</td>
                <td style={{ width: "20%" }}>{key.tech}</td>
                <td style={{ width: "14%" }}>
                  {key.sub === true ? "Yes" : "No"}
                </td>
                <td style={{ width: "5%" }}>
                  <span onClick={(e) => this.handleDelete(index, key.id)}>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </span>
                </td>
              </tr>
            );
          });

    return (
      <Card>
        <CardHeader style={{ textAlign: "center" }} className="headerBold">
          Employee Details
          <Button
            type="button"
            style={{
              float: "right",
              width: "10%",
            }}
            onClick={(e) => this.addEmployee()}
          >
            <b> Add </b>
          </Button>
        </CardHeader>
        <CardHeader>
          <InputGroup>
            <Input
              type="search"
              name="searchInput"
              onChange={(e) => this.handleChange()}
              placeholder="Search By Name"
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fa fa-search"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <th style={{ width: "10%" }}>Employee Name</th>
              <th style={{ width: "10%" }}>Technology</th>
              <th style={{ width: "10%" }}>Subscription</th>
            </thead>
          </Table>
          <Table responsive striped>
            <tbody>{tabledata}</tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
export default List;
