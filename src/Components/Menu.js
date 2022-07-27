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
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MenuComponent } from "@syncfusion/ej2-react-navigations";
import "./index.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Add from "./Add";
import List from "./List";

class MenuFile extends React.Component {
  constructor() {
    super(...arguments);
    this.mediaQuery = "(min-width: 600px)";
    this.state = {
      filtered: [],
      searchStatus: 0,
      data: [],
      menuItemsForOtherShops: [
        {
          text: "Employee Details",
          iconCss: "icon-picture icon",
          url: "/List",
        },
        {
          text: "Add Employee",
          iconCss: "icon-picture icon",
          url: "/Add",
        },
      ],

      //json data list to display on screen
    };
    this.enableDock = true;
    this.dockSize = "52px";
    this.width = "220px";
    this.target = ".main-content";
  }

  render() {
    return (
      <Router>
        <div className="control-section">
          <div className="col-lg-12 col-sm-12 col-md-12 center"></div>
          <div id="wrapper">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div
                className="header-section dock-menu"
                id="header"
                style={{ border: "none" }}
              >
                <ul className="header-list">
                  <li
                    id="hamburger"
                    className="icon-menu icon list"
                    onClick={this.openClick.bind(this)}
                  ></li>
                </ul>
              </div>
              <SidebarComponent
                id="sidebar-menu"
                ref={(Sidebar) => (this.sidebarObj = Sidebar)}
                enableDock={this.enableDock}
                mediaQuery={this.mediaQuery}
                dockSize={this.dockSize}
                width={this.width}
                target={this.target}
              >
                <div className="main-menu">
                  <p className="main-menu-header"></p>
                  <MenuComponent
                    items={this.state.menuItemsForOtherShops}
                    orientation="Vertical"
                    cssClass="dock-menu"
                  ></MenuComponent>
                </div>
              </SidebarComponent>
              <div className="main-content" id="maintext">
                <div ml-5>
                  <Route path="/Add" exact component={Add} />
                  <Route path="/List" exact component={List} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
  openClick() {
    this.sidebarObj.toggle();
  }
}
export default MenuFile;
