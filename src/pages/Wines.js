import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
// import Form from "../components/Form";
import Wine from "../components/Wine";
// import Footer from "../components/Footer";
// import Infowine from "../components/Infowine";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { List } from "../components/List";


class Wines extends Component {
  state = {
    // books: [],
    winesMaster: [],
    wineCollections: [],
    // q: "",
    // message: "Search for a wine",
    showMe: false,
    // text: "add wine",
    wineId: "",
    wineName:"",
    wineacidity: "",
    wineageability: "",
    winealcohol: "",
    winebody: "",
    winedecant: "",
    wineglassType: "",
    winepairings: "",
    wineprimaryFlavors: [],
    winepronunciation: "",
    winesummary: "",
    winesweetness: "",
    winetannin: "",
    winetemp: "",

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
  
  };

  componentDidMount() {
    this.getUser()
    this.getMaster();
  }

  getUser = () => {
    API.getUser().then(response => {
      console.log("LOGGED IN USER: ", response)
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        console.log(response.data);
        this.setState({
          loggedIn: true,
          user: response.data.user
        })

        // this.getSavedWine()
      } else {
        this.setState({
          loggedIn: false,
          user: null,
          redirectTo: "/"
        });
      }
    });
  }


  // getSavedWine = () => {
  //   console.log("////////////////");
  //   console.log(this.state.user.email);
  //   console.log("////////////////");
  //   const admin = { email: this.state.user.email };
  //   API.getSavedWine(admin)
  //     .then(res => {
  //       // console.log("SAVESTAFF")
  //       // console.log(res.data);
  //       // console.log("SAVESTAFF")
  //       // console.log(res.data._id);
  //       // console.log(res.data[0]);
  //       this.setState({
  //         restaurantId: res.data._id,
  //         // wines: res.data.Wines,
  //       })
  //     }

  //     )
  //     .catch(() =>
  //       this.setState({
  //         message: "Wine not available"
  //       })
  //     );
  // };

  hideShow = id => {
    const newState = { ...this.state }
    const wine = this.state.winesMaster.find(wine => wine._id === id);
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

 

  getMaster = () => {
    API.getMaster()
      .then(res => {
        console.log("COMEBACK FROM MASTER")
        console.log(res.data);
        console.log("MASTER")
        this.setState({
          winesMaster: res.data
        })
      }
      )
      .catch(() =>
        this.setState({
          message: "Wine not available"
        })
      );
  };

  
handleWineAdd = id => {
  console.log("???????????????");
  console.log(this.state);
  console.log("REID: " + this.state.user.restaurantId);
  const wine = this.state.winesMaster.find(wine => wine._id === id);
  const wineData = {
    Wines: wine._id,
    restaurantId: this.state.user.restaurantId
    }
    console.log("ADDWINE INFOR");
    console.log(wineData);
    console.log("ADDWINE INFOR");

  API.addWine(wineData).then(res => {
    console.log("ADD WINE");
    console.log(res.data.Wines);
    console.log("ADD WINE");
    this.setState({
      wineCollections: res.data.Wines
    });
  
  });
}
//     const wine = this.state.wines.find(wine => wine._id === id);
// console.log(id);
//     API.addWine({
//       // wineId: id,
//       // name: wine.name,
//       // lacidity: wine.wine.aciditys,
//       Wines: id,
//     }).then(() => this.getMaster());
//     console.log(id);
//   };

  render() {

    return (
      <Container>
<div className="allwrap">
<div className="mainWrapper1">
<div className="mainWrapper2">
<div className="mainWrapper3">

        <div className="winesnav">
        <div>
          {/* <Link className="navbar-brand" to="/">
            Wine academy
        </Link> */}
        </div>
       
        </div>
<br></br>
        <Jumbotron>
<div className="texttanninwrap">
        <h1 className="texttannin">
            <strong>Tannin</strong>
          </h1>
          </div>
          <br></br>
          <div className="textwinecolwrap">
          <h1 className="textwinecol">
            <strong>Wine Collections</strong>
          </h1>
</div>
<div className="textwinecolwrap">
          <h2 className="text-center">Add Wine to your Restaurant.</h2>
          </div>
        </Jumbotron>

        <div className="btnadminpagewrap">
          <Link
            className={window.location.pathname === "/admin" ? "nav-link active" : "nav-link"}
            to="/admin"
          ><button className="btnadminpage"><i className="fas fa-wine-glass-alt">   <span>Your Restaurant</span></i>
              
            </button>
              </Link>
        </div>

        </div>
        </div>
        </div>
        {/* <Card title="Wine Search">

              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card> */}
            <div className="cardwrapper0">

            <div className="winesheader">
            
            <h1 className="textcenter">
            <strong>Search for WINES</strong>
          </h1>
          </div>

          <div className="cardwrapper1a">
            <div className="cardwrapper1">
      <div className="cardwrapper2">
        <Card title="">
          {this.state.winesMaster.length ? (
            <List>

              {this.state.winesMaster.map(wine => (
                <Wine
                  key={wine._id}
                  id={wine._id}
                  name={wine.name}

                  
                  showMe={this.state.showMe}
                  hideShow={this.hideShow}
                  handleWineAdd={this.handleWineAdd}
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
                >
                </Wine>
              ))}
            </List>
          ) : (
              <h2 className="text-center">{this.state.message}</h2>
            )}
        </Card>
        </div>
        </div>
        </div>
        </div>
        {/* -------------------- */}

        </div>
{/*         
        <Footer /> */}
      </Container>
    );
  }
}

export default Wines;
