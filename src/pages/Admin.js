import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import Restowine from "../components/Restowine";
import Employees from "../components/Employees";
import Addemployee from "../components/Addemployee";
// // import Footer from "../components/Footer";
import Header from "../components/Header";
import Userinfo from "../components/Userinfo";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { List } from "../components/List";
import { Link } from "react-router-dom";
import "./style.css";
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// import { CSSTransitionGroup } from 'react-transition-group';
// import { Transition } from 'react-transition-group';


class Admin extends Component {
  state = {
    restaurants: [],
    employeesList: [],
    winesMaster: [],
    wineCollections: [],
visible: false,
    showMe: false,
    showMe2: false,
    showMe3: false,
    showMeEmp: false,
    // text: "add wine",
    wineId: "",
    wineName: "",
    wineacidity: "",
    wineageability: "",
    winealcohol: "",
    winebody: "",
    winedecant: "",
    wineglassType: "",
    winepairings: "",
    wineprimaryFlavors: [],
    winepronunciation: "",
    winesummary: "",
    winesweetness: "",
    winetannin: "",
    winetemp: "",

    empId: "",
    empfirstName: "",
    emplastName: "",
    empEmail: '"',
    empScores:[],

    user: "",
    // restaurantId: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    // loginemail: "",
    // loginpassword: "",
    loggedIn: true,
    redirectTo: null,

    greet: "",
    userId: "",
    usefirstName: "",
    uselastName: "",
    useEmail: "",
    userestaurantName: ""


  };

  componentDidMount() {
    this.getUser()
  }

  handleClick = () => {
    this.setState({ visible: ! this.state.visible });
  }

  getUser = () => {
    API.getUser().then(response => {
      console.log("LOGGED IN USER: ", response)
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        console.log(response.data);
        this.setState({
          loggedIn: true,
          user: response.data.user,

        })

        this.getSavedWine()
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
        this.props.history.push(`/`);
      }
    });
  }
  hideShow2 = () => {
    const newState = { ...this.state }
    newState.showMe2 = !newState.showMe2
    // newState.scale = this.state.scale > 1 ? 1 : 1.5

    this.setState(newState);
  }

  hideShow = id => {
    const newState = { ...this.state }
    const wine = this.state.wineCollections.find(wine => wine._id === id);
    newState.wineId = id
    newState.wineName = wine.name
    newState.wineacidity = wine.acidity
    newState.wineageability = wine.ageability
    newState.winealcohol = wine.alcohol
    newState.winebody = wine.body
    newState.winedecant = wine.decant
    newState.wineglassType = wine.glassType
    newState.winepairings = wine.pairings
    newState.wineprimaryFlavors = wine.primaryFlavors
    newState.winepronunciation = wine.pronunciation
    newState.winesummary = wine.summary
    newState.winesweetness = wine.sweetness
    newState.winetannin = wine.tannin
    newState.winetemp = wine.temp
    newState.showMe = !newState.showMe
    newState.scale = this.state.scale > 1 ? 1 : 1.5

    this.setState(newState);
  }


  hideShowEmp = id => {
    const newState = { ...this.state }

    const emp = this.state.employeesList.find(emp => emp._id === id);

    newState.empId = id
    newState.empfirstName = emp.firstName
    newState.emplastName = emp.lastName
    newState.empEmail = emp.email
    newState.empScores = emp.scores

    newState.showMeEmp = !newState.showMeEmp


    this.setState(newState);
    console.log(newState.empScores)
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value

    });
  };
  handleLogout = () => {

    console.log('logging out');
    API.logOut().then(response => {
      console.log(response.data);
      this.setState({
        loggedIn: false,
        user: null,
      })
      this.props.history.push(`/`);
    });
  };

  getSavedWine = () => {
    console.log("////////////////");
    console.log(this.state.user.restaurantId);
    console.log("////////////////");
    const admin = { restaurantId: this.state.user.restaurantId };
    API.getSavedWine(admin)
      .then(res => {
        // console.log(res.data);
        console.log("DEDADAEDAEDAEDAEDDA");
        console.log(res.data._id);
        // console.log(res.data[0]);
        console.log("SAVESTAFF");
        console.log(res.data);
        console.log("SAVESTAFF");
        this.setState({
          employeesList: res.data.Employees,
          wineCollections: res.data.Wines,

        })
      }

      )
      .catch(() =>
        this.setState({
          message: "Wine not available"
        })
      );
  };
  handleAddEmployeeChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  }
  handleAddEmpolyeeFormSubmit = event => {
    event.preventDefault();
    this.addEmployee();
    // this.hideShow2();
  }

  addEmployee = () => {

    // console.log(restaurantId)
    const employeeData = { name: this.state.name, lastName: this.state.lastName, email: this.state.email, password: this.state.password, restaurantId: this.state.user.restaurantId, restaurantName: this.state.user.restaurantName };
    console.log("ADDRESNAME?????");
    console.log(employeeData);
    API.addEmployee(employeeData).then((res) => {
      console.log("ADD Employees");
      console.log(res.data.employee);
      console.log(res.data.restaurant);
      if (res.data === "Employee already exists") {
        alert(res.data)
        this.hideShow2();
      }
      else {
        // alert(JSON.stringify(res.data))
        this.state.employeesList.unshift(res.data.employee)
        this.setState({
          employeesList: this.state.employeesList
        });
        this.hideShow2();
      }
    });
  }

  handleWineDelete = id => {
    console.log("/////");
    console.log(id);
    const delelteWine = { id: id, restaurantId: this.state.user.restaurantId };
    console.log(delelteWine);
    API.deleteWine(delelteWine).then(res => this.componentDidMount());
  };

  handleEmployeeDelete = id => {
    const deleteEmp = { id: id, restaurantId: this.state.user.restaurantId };
    console.log("??????????????");
    console.log(deleteEmp);
    console.log("??????????????");
    // const deleltData = {id: id, restaurantId: this.state.restaurantId}

    API.deleteEmployee(deleteEmp).then(res =>

      this.componentDidMount()
    )
  }


  hideShow3 = id => {
    const newState = { ...this.state }

    if (newState.user === null) {
      console.log("you lose");
      newState.greet = "Hello Guest"
    }
    else if (newState.user.firstName) {
      newState.greet = "Welcome"
      newState.useId = newState.user._id
      newState.usefirstName = newState.user.firstName
      newState.uselastName = newState.user.lastName
      newState.useEmail = newState.user.email
      newState.userestaurantName = newState.user.restaurantName
      console.log(newState.useId);
    }

    newState.showMe3 = !newState.showMe3
    this.setState(newState);

  }




  render() {


    return (

      <Container>

{/* <div>
            <button onClick={this.handleClick}>{this.state.visible ? 'Slide up' : 'Slide down'}</button>
            <CSSTransitionGroup transitionName="example">
            	{ this.state.visible ? <div className='panel' /> : null }
            </CSSTransitionGroup>
        </div> */}
    

        <Userinfo
          useId={this.state.useId}
          usefirstName={this.state.usefirstName}
          uselastName={this.state.uselastName}
          userestaurantName={this.state.userestaurantName}
          useEmail = {this.state.useEmail}
          showMe3={this.state.showMe3}
          hideShow3={this.hideShow3}
          handleLogout={this.handleLogout}
          greet={this.state.greet}
        ></Userinfo>



        {/* MODAL ----------------------- */}
        <Addemployee
          handleAddEmployeeChange={this.handleAddEmployeeChange}
          handleAddEmpolyeeFormSubmit={this.handleAddEmpolyeeFormSubmit}
          id={this.state.id}
          restaurant={this.state.restaurant}
          name={this.state.name}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          //  loginemail={this.state.loginemail}
          //  loginpassword={this.state.loginpassword}
          showMe2={this.state.showMe2}
          hideShow2={this.hideShow2}
        ></Addemployee>

        {/* MODAL ----------------------- */}

        <div className="wineandemployeewrapper">
          <div className="brandCol">
            <div className="welcomebtnwrap">
              <div>
<div></div>

                <button
                  onClick={() => this.hideShow3()}
                  className="welcomebtn"
                ><Header
                    user={this.state.user} />
                </button>

                {/* <button onClick={this.handleLogout} type="submit" className="btn btn-lg btn-danger float-right">
                Logout
         </button> */}
              </div>
            </div>
          </div>
          <div className="wineCol">
            <div className="wineTitleWrap">
              <div className="wineTitleWrap1">
                <div className="textadmin">Wines</div>
                <div><Link

                  to="/wines"
                ><button className="addwinebtnmain"><i className="fas fa-wine-bottle"></i>
                  </button>

                </Link></div>


              </div>
            </div>
            <div className="wineColWrap">
              <div className="wineColWrap1">
                {this.state.wineCollections.length ? (
                  <List>
                    {this.state.wineCollections.map(wine => (
                      <Restowine
                        key={wine._id}
                        id={wine._id}
                        name={wine.name}
                        handleWineDelete={this.handleWineDelete}
                        showMe={this.state.showMe}
                        hideShow={this.hideShow}
                        wineName={this.state.wineName}
                        wineId={this.state.wineId}
                        wineacidity={this.state.wineacidity}
                        wineageability={this.state.wineageability}
                        winealcohol={this.state.winealcohol}
                        winebody={this.state.winebody}
                        winedecant={this.state.winedecant}
                        wineglassType={this.state.wineglassType}
                        winepairings={this.state.winepairings}
                        wineprimaryFlavors={this.state.wineprimaryFlavors}
                        winepronunciation={this.state.winepronunciation}
                        winesummary={this.state.winesummary}
                        winesweetness={this.state.winesweetness}
                        winetannin={this.state.winetannin}
                        winetemp={this.state.winetemp}

                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">Not Available</h2>
                  )}
              </div>
            </div>
          </div>
          {/* -----------------EMPLOYEES COLUMN------------------- */}
          <div className="employeeCol">
            <div className="empTitleWrap">
              <div className="empTitleWrap1">
                <div className="textadmin">Employees</div>
                <div><button className="addempbtnmain" onClick={() => this.hideShow2()}><i className="fas fa-user-plus"></i></button></div>
              </div>
            </div>

            <div className="employeeColWrap">
              <div className="employeeColWrap1">
                {this.state.employeesList.length ? (
                  <List>
                    {this.state.employeesList.map(employee => (
                      <Employees
                        key={employee._id}
                        id={employee._id}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        handleWineDelete={this.handleWineDelete}
                        empId={this.state.empId}
                        empfirstName={this.state.empfirstName}
                        emplastName={this.state.emplastName}
                        empEmail={this.state.empEmail}
                        empScores={this.state.empScores}

                        showMeEmp={this.state.showMeEmp}
                        hideShowEmp={this.hideShowEmp}
                        handleEmployeeDelete={this.handleEmployeeDelete}
                      // Button={() => (
                      //   <button
                      //     onClick={() => this.handleEmployeeDelete(employee._id)}
                      //     className="btn btn-danger ml-2"
                      //   >
                      //     Delete
                      // </button>
                      // )}
                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">Add Employees</h2>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* 
        <Footer /> */}
      </Container>
    );
  }
}

export default Admin;
