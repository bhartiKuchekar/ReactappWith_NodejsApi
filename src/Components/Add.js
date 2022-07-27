import React from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Toast,
} from "reactstrap";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tech: "",
      sub: true,
      count: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSelect(e) {
    this.setState({
      sub: document.getElementsByName("sub")[0].value,
    });
  }
  handleSubmit = (event) => {
    const employee = {
      name: this.state.name,
      tech: this.state.tech,
      sub: this.state.sub,
    };
    if (employee.name === "" || employee.tech === "" || employee.sub === "") {
      ToastsStore.error("Please filled Mandatory fields");
    } else {
      axios.post("/aliens/save", employee).then((res) => {
        console.log(res);
        if (res.status === 200) {
          ToastsStore.success("Employee added Successfully..");
          this.props.history.push("/List");
        } else {
          ToastsStore.error("Error");
        }
      });
    }
  };
  back() {
    this.props.history.push("/List");
  }
  render() {
    return (
      <Card>
        <CardHeader style={{ textAlign: "center" }} className="headerBold">
          Add Employee
        </CardHeader>

        <CardBody>
          <ToastsContainer
            position={ToastsContainerPosition.BOTTOM_CENTER}
            store={ToastsStore}
          />
          <FormGroup row>
            <Col md="3">
              <Label>
                Employee Name<span class="req">*</span>:
              </Label>
            </Col>
            <Col md="7">
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                placeholder="Employee Name"
                required
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>
                Technology<span class="req">*</span>:
              </Label>
            </Col>
            <Col md="7">
              <Input
                type="text"
                name="tech"
                value={this.state.tech}
                onChange={this.onChange}
                placeholder="Technology"
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>
                Subscription:<span class="req">*</span>:
              </Label>
            </Col>
            <Col md="7">
              <Input
                type="select"
                value={this.state.sub}
                name="sub"
                onChange={(e) => {
                  this.handleSelect(this);
                }}
                required
              >
                <option value={true} key="Yes">
                  Yes
                </option>
                <option value={false} key="No">
                  No
                </option>
              </Input>
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter style={{ textAlign: "center" }}>
          <Button
            type="button"
            size="sm"
            className="ButtonProductList"
            onClick={this.handleSubmit}
            style={{ width: "10%" }}
          >
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            className="ButtonProductList"
            onClick={(e) => this.back()}
            style={{ width: "10%" }}
          >
            Back
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default Add;
