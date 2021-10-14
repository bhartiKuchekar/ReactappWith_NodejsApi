import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router,Route, Link } from 'react-router-dom'
import {Button,Card,CardBody,CardFooter,CardHeader,Col,Form,FormGroup,Input,Label,InputGroup,InputGroupAddon,InputGroupText,Table} from 'reactstrap';
import 'antd/dist/antd.css';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import './index.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
class MenuFile extends React.Component{
	constructor() {
        super(...arguments);
        this.mediaQuery = '(min-width: 600px)';
            this.state={
            filtered:[],
            searchStatus:0,
            flagCount:0,
            data:[
                {
               "message": "Need more information about documents1",
               "deleteFlag": true,
               "markAsReadFlag": true,
               "FlagVisible": true,
               "isRead":false,
               "isFlagClick":false,
               "importantflag": true,
               "noofmessage": "1",
               "contactNo": "0987654321",
               "date":"14/10/21"
             },{
               "message": "Need more information about documents2",
               "deleteFlag": true,
               "markAsReadFlag": true,
               "FlagVisible": true,
               "isRead":false,
               "isFlagClick":false,
               "importantflag": true,
               "noofmessage": "1",
               "contactNo": "0987654321",
               "date":"14/10/21"
             },{
               "message": "Need more information about documents4",
               "deleteFlag": true,
               "markAsReadFlag": true,
               "FlagVisible": true,
               "isRead":false,
               "isFlagClick":false,
               "importantflag": true,
               "noofmessage": "1",
               "contactNo": "0987654321",
               "date":"14/10/21"
             },{
               "message": "Need more information about documents5",
               "deleteFlag": true,
               "markAsReadFlag": true,
               "FlagVisible": true,
               "isRead":false,
               "isFlagClick":false,
               "importantflag": true,
               "noofmessage": "1",
               "contactNo": "0987654321",
               "date":"14/10/21"
             }
            ],
        }
         this.menuItemsForOtherShops = [
             {
                text: 'Inbox',
                iconCss: 'icon-picture icon',
                url: "/Inbox#/MenuFile"
            },
          
            {
                text: 'Flagged',
                iconCss: 'icon-picture icon',
                url: "/Flag#/MenuFile"

            },
            {
                text: 'Spam',
                iconCss: 'icon-picture icon',
                url: "/Spam#/MenuFile"
            },
            {
                text: 'Deleted',
                iconCss: 'icon-picture icon',
                url: "/Delete#/MenuFile"
               }
            ];

        this.enableDock = true;
        this.dockSize = '52px';
        this.width = '220px';
        this.target = '.main-content';
	}

    handleChange(e){
        var userInput = document.getElementsByName('searchInput')[0].value;
        var count=0;
        const lData=[];
        const data = this.state.data;
        console.log(data);
        if(userInput !== "")
        {
            var regex = new RegExp(userInput, "i");
            
            {this.state.data.map(val =>{
               if (
                 (val.message!=null?val.message:'').search(regex) !== -1)
                {
                  const x = {
               "message": val.message,
               "deleteFlag": val.deleteFlag,
               "markAsReadFlag": val.markAsReadFlag,
               "FlagVisible":val.FlagVisible ,
               "importantflag": val.importantflag,
               "noofmessage": val.noofmessage,
               "contactNo": val.contactNo,
               "date":val.date,
                  }
                  lData.push(x);
                  count++;
                }
              })
            }
              this.setState({
                searchStatus:1,
                filtered : lData,
            })
        }else{ 
         this.setState({
          searchStatus : 0,
         })
         }
      }
      handleChangeFlag(index){
        let temp = this.state.data
        temp[index].isFlagClick=true
        this.setState({
            data:temp
        })
            }
      handleChangeDelete(index){
        let temp = this.state.data
        temp.splice(index, 1);
        this.setState({
            data:temp,
        })
      }
      showIconEnter(index){
        var temp = this.state.searchStatus===0?this.state.data:this.state.filtered
        temp[index].FlagVisible = false
        this.setState({
          dataTemp:temp
        })
       }
       showIconLeave(index){
        var temp = this.state.searchStatus===0?this.state.data:this.state.filtered
        temp[index].FlagVisible = true
        this.setState({
          dataTemp:temp
        })
       }
       componentDidMount() {   
        var temp= this.state.data
        var flagCount = 0
        for(var i=0;i<temp.length;i++){
        if(temp[i].isFlagClick){
            flagCount++
        }
        }
        this.setState({
        flagCount:flagCount
      })
      }
      
      render() {
      const x = this.state.searchStatus === 0 ? this.state.data : this.state.filtered;
      const tabledata = x.length===0?"No Data Found":x.map((msg,index) => {
      return <tr onMouseEnter={(e)=>{this.showIconEnter(index)}}
                 onMouseLeave={(e)=>{this.showIconLeave(index)}}>
        <td style={msg.isRead?{width:"20%"}:{width:"20%",fontWeight:"bold"}} >{msg.message}<br></br>{msg.contactNo}</td>
        <td style={{width:"10%",fontWeight:"bold"}}><span>{msg.isRead?"":1}</span></td>
        <td style={{width:"10%"}}>{msg.date}<br></br>
        <span style={{margin:"2%"}} hidden={msg.FlagVisible}> <i className="fa fa-exclamation-triangle"></i></span> 
        <span style={{margin:"2%"}} hidden={msg.FlagVisible} onClick={(e)=>this.handleChangeFlag(index)}> <i className="fa fa-flag"></i></span> 
        <span style={{margin:"2%"}} hidden={msg.FlagVisible} onClick={(e)=>this.handleChangeDelete(index)}> <i className="fa fa-trash"></i></span>
        </td>
        <td style={{width:"20%"}}></td>
        </tr>
    })
        return (
            <Router >
                <div className="control-section">
                    <div className="col-lg-12 col-sm-12 col-md-12 center">
               </div>
                    <div id="wrapper">
                        <div className="col-lg-12 col-sm-12 col-md-12">
                            <div className="header-section dock-menu" id="header" style={{ border: "none" }}>
                                <ul className="header-list">
                                    <li id="hamburger" className="icon-menu icon list" onClick={this.openClick.bind(this)}></li>
                                    <img src={""} style={{ marginLeft: "1.5%", marginTop: "0.5%", backgroundColor: "white", float: "left" }} />

                                    <span style={{ textAlign: "center" }}><h3 style={{ marginTop: "0.5%" }}><MenuComponent items={this.AccountMenuItem} style={{ marginTop: "-0.4%" }} cssClass='dock-menu'></MenuComponent></h3></span>

                                </ul>
                            </div>
                            <SidebarComponent id="sidebar-menu" ref={Sidebar => this.sidebarobj = Sidebar} enableDock={this.enableDock}
                                mediaQuery={this.mediaQuery} dockSize={this.dockSize} width={this.width} target={this.target}>
                                <div className="main-menu">
                                    <p className="main-menu-header"></p>
                                    <MenuComponent items={this.menuItemsForOtherShops} orientation='Vertical' cssClass='dock-menu'></MenuComponent>
                                </div>
                            </SidebarComponent>
                            
                            <div className="main-content" id="maintext">
                                <div ml-5>
                                <Card>
                                    <CardHeader>
                                <InputGroup>
                                <Input type="search" name="searchInput" onChange={(e)=>this.handleChange()} placeholder="Search By Message" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            </CardHeader>
                            <CardBody>
                            <Table>
                        <thead>
                            <th style={{width:"10%"}}>Last Month</th>
                     </thead>
                        </Table>
                        <Table responsive striped>
                        <tbody>
                            {tabledata}
                        </tbody>
                    </Table>
                    </CardBody>
                    </Card>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
    openClick() {
        this.sidebarobj.toggle();
    }
}
export default MenuFile
