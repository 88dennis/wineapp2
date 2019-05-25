import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import SavedWine from "../components/SavedWine";
// import Addemployee from "../components/Addemployee";
// import Footer from "../components/Footer";
import API from "../utils/API";
// import Header from "../components/Header";
import Header2 from "../components/Header2";
// import Wrapper from "../components/Wrapper";
// import QuestionCard from "../components/QuestionCard";
import Empinfo from "../components/Empinfo";
import { Container } from "../components/Grid";
import questions from "../questions.json";
// importing the wine template for testing purposes 
import wineData from "../franciacorta.json"
import ScoreSummary from "../components/Scores"
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import "./style.css";


class EmployeePage extends Component {
  state = {
    wineCollections: [],
    scoreCollection: [],

    showMeSummary: false,
    showMe6: false,
    showMe4: false,
    showMe: false,
    user: "",
    loggedIn: true,
    redirectTo: null,
    id: "",
    restaurant: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loginemail: "",
    loginpassword: "",

    greet: "",
    empuserId: "",
    empusefirstName: "",
    empuselastName: "",
    empuserestaurantName: "",
    empuseEmail: "",

    questions,
    filteredQs: [],
    correctFlavors: wineData.primaryFlavors,
    submittedFlavor: "",
    wineData,
    counter: 0,
    score: 0,
    highScore: 0,

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


    winewiththisscore:"",
    newScores:[],
    scoreId:"",
    testmessage:""

  };

  hideShowSummary = id => {
    const newState = { ...this.state }
    newState.empuseId = newState.user._id
    newState.newScores = newState.scoreCollection


    newState.showMeSummary = !newState.showMeSummary
    this.setState(newState);
    console.log('HEHEHEHEHEHE')
    console.log(newState.newScores)
  };


  componentDidMount() {
    this.getUser()
  }

  getUser = () => {

    
    API.getUser().then(response => {
      console.log("LOGGED IN USER: ", response)
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        console.log(response.data.user.scores);
        this.setState({
          loggedIn: true,
          user: response.data.user,
          scoreCollection: response.data.user.scores,
        });
        this.getSavedWine()
      }
      else {
        this.setState({
          loggedIn: false,
          user: null
        });
        this.props.history.push(`/`);
      }
    });
  }
// getScore = () => {

//   console.log('asdhoasdhoiahsdohOYYYYYYY');
//   console.log(res.data.Wines);

// }
  getSavedWine = () => {
    console.log("////////////////");
    console.log(this.state.user.restaurantId);
    console.log("////////////////");
    console.log(this.state.user.scores);
    console.log(this.state.wineCollections);
    

    // this.state.scoreCollection.map(score => (
    //   newState.newScore= this.state.user.scores
    //     ))
      
// console.log(newState.newScore);
    const admin = { restaurantId: this.state.user.restaurantId };
    API.getSavedWine(admin)
      .then(res => {

        this.setState({
          wineCollections: res.data.Wines,

        })

        this.showScore()

    //     console.log("////////////////");
    //     console.log(this.state.user.scores);

    //     let idofwineinscore = []
    //     let thiswineId= scoreId

    //     this.wineCollections.map(thiswine=> (
    //       thiswineId = thiswine._id
    
    //     ))

    // this.state.user.scores.map(scoreId=> (
    //   idofwineinscore = scoreId._id

    // ))

    // console.log(idofwineinscore)


      }

      )
      .catch(() =>
        this.setState({
          message: "Wine not available"
        })
      );
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value

    });
  };
  handleLogout = event => {

    console.log('logging out');
    API.logOut().then(response => {
      console.log(response.data.msg);
      this.setState({
        loggedIn: false,
        user: null,
      });
      this.props.history.push(`/`);
      console.log(this.state);
    });
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



  hideShow4 = id => {
    const newState = { ...this.state }
    newState.greet = "Welcome"
    newState.empuseId = newState.user._id
    newState.empusefirstName = newState.user.firstName
    newState.empuselastName = newState.user.lastName
    newState.empuserestaurantName = newState.user.restaurantName
    newState.empuseEmail = newState.user.email
    console.log(newState.empuseId);
    newState.showMe4 = !newState.showMe4
    this.setState(newState);
  }


  // showScore = winename => {
  //   const newState = { ...this.state }


  //   const score = this.state.scoreCollection.find(score => score.wine === winename);

  //   if (newState.newScore === null) {
  //     console.log("you lose");
  //     newState.testmessage = "take Exam"
  //     newState.newScore = "0"
  //   }
  //   else if (newState.user.firstName) {
  //     newState.testmessage = ""
  //     newState.winewiththisscore = winename
  //     newState.scoreId = score._id
  //     newState.newScore = score.score
  //   }

  //   this.setState(newState);
  //   console.log('blablabla')
  //   console.log(newState.newScore)
  // }
  // ----------

  render() {
    return (

      <Container>



        <div className="emppagemainwrap">
          <Empinfo
            useId={this.state.useId}
            useEmail={this.state.empuseEmail}
            usefirstName={this.state.empusefirstName}
            uselastName={this.state.empuselastName}
            userestaurantName={this.state.empuserestaurantName}
            showMe4={this.state.showMe4}
            hideShow4={this.hideShow4}
            handleLogout={this.handleLogout}
            greet={this.state.greet}
          ></Empinfo>





          {/* <Jumbotron>
          <h1 className="text-center">
            <strong>ADMIN PAGE WINE COLLECTIONS & EMPLOYEE LIST</strong>
          </h1>
          <h2 className="text-center">Search for wine collections and Add Employees</h2>
        </Jumbotron> */}


          <div className="employeepagewrapper">

            <div className="emppagecol">
              <div className="empwelcomebtnwrap">
                <button
                  onClick={() => this.hideShow4()}
                  className="empwelcomebtn"
                >
                <Header2
                    user={this.state.user}
                     />
                </button>


              </div>
<div className = "quizsummarybtnwrap">
              <button
                  onClick={() => this.hideShowSummary()}
                  className="quizsummarybtn"
                >
                Test Scores
                </button>
                </div>
              <div className="wineTitleWrap">
                <div className="wineTitleWrap1">

                  {/* <div><Link
            className={window.location.pathname === "/wines" ? "nav-link active" : "nav-link"} 
            to="/wines"
          ><button>
          
            </button>
              </Link></div> */}
                </div>
              </div>


              <div className="emppageColWrap">
                <div className="emppageColWrap1">
                 
                
                                  
                  {this.state.wineCollections.length ? (
                    <List>
                      {this.state.wineCollections.map(wine => (

                        <SavedWine
                        // showScore = {this.showScore}
                        // newScore = {this.state.newScore}
                          key={wine._id}
                          id={wine._id}
                          name={wine.name}
                          ageability={wine.ageability}
                          // handleWineDelete={this.handleWineDelete}
                          hideShowQuiz={this.hideShowQuiz}
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
                        >
                        
                        </SavedWine>
                        
                      ))}
                    </List>
                  ) : (
                      <h2 className="text-center"> </h2>
                    )}
                </div>
              </div>

              
                <div>
                  {this.state.scoreCollection.length ? (
                    <List>
                      {this.state.scoreCollection.map(score => (
                        <ScoreSummary
                          key={score._id}
                         wine={score.wine}
                         score={score.score}
                         newScores={this.state.newScores}
                         hideShowSummary={this.hideShowSummary}
                         showMeSummary={this.state.showMeSummary}
                        />
                      ))}
                    </List>
                  ) : (
                      <h2 className="text-center"> </h2>
                    )}
                </div>
              </div>
            {/* -----------------EMPLOYEES COLUMN------------------- */}

          </div>
          {/* <Footer /> */}
        </div>
      </Container>
    );
  }
}

export default EmployeePage;
