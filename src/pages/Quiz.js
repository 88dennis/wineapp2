import React, { Component } from 'react';
// importing components
// import EmployeePage from "./pages/EmployeePage";
import API from "../utils/API";
import QuestionCard from "../components/QuestionCard";
import Wrapper from "../components/Wrapper";
// importing the question array from the json file
import questions from "../questions.json";
// importing the wine template for testing purposes 
// import wineData from "../franciacorta.json"
import { Link } from "react-router-dom";
//importing css stylings
import './style.css';

class Quiz extends Component {

  state = {
    user: [],
    questions,
    filteredQs: [],
    correctFlavors: [],
    submittedFlavor: "",
    // wineData:[],
    counter: 0,
    score: 0,
    highScore: 0,
    wineData: []
  }

  // componentWillMount shuffles the CharacterCards before the DOM is loaded
  componentWillMount() {
    this.getUser();
  }

  getUser = () => {
    API.getUser().then(response => {
      console.log("LOGGED IN USER: ", response)
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        console.log(response.data.user.scores);
        console.log("???????????????");
        this.setState({
          loggedIn: true,
          user: response.data.user,
        });
        this.getSavedWine();
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

  getSavedWine = () => {
    console.log("////////////////");
    console.log(this.state.user.restaurantId);
    console.log("////////////////");
    const admin = { restaurantId: this.state.user.restaurantId };
    API.getSavedWine(admin)
      .then(res => {
        this.setState({
          wineCollections: res.data.Wines,
        })
        this.getClickedWine()
      }
      )
      .catch(() =>
        this.setState({
          message: "Wine not available"
        })
      );
  }

  getClickedWine = () => {
    const id = this.props.location.state.wineId
    const wine = this.state.wineCollections.find(wine => wine._id === id);
    console.log(wine);
    this.setState({
      wineData: wine,
      correctFlavors: wine.primaryFlavors
    });

    const categories = Object.keys(this.state.wineData);

    const filteredQs = questions.filter(q => {
      return categories.includes(q.category)
    });
    this.setState({ filteredQs: filteredQs });
    // this.shuffle(filteredQs);
    console.log("????????????????");
    console.log(filteredQs);
  }

  // Here we use the Fisher-Yates alogrithm to randomize the characters array
  shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  };

  handleBtnClick = (event) => {
    // renaming this.state so we don't have to write it out each time
    const newState = { ...this.state };

    let points = parseInt(event.target.value);
    newState.counter = newState.counter + points

    this.setState(newState);
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleCheckFlavor = () => {

    const newState = { ...this.state };

    if (this.state.correctFlavors.includes(this.state.submittedFlavor)) {
      this.setState({
        counter: newState.counter + 1,
        submittedFlavor: ""
      })
    } else {
      this.setState({
        submittedFlavor: ""
      })
    }
  }

  handleScoreCalc = () => {
   const newState = {...this.state};
    let hundreds =  newState.counter * 100;
    let total = this.state.filteredQs.length;
    this.state.score = hundreds / total;
  
    // this.setState(newState);
    console.log("STATE");
    console.log(this.state);
    console.log("///////////////////");
    // newState.score > newState.highscore ? newState.highscore = newState.Score : newState.highScore = newState.highscore

    console.log("hundreds: ", hundreds);
    console.log("total # of Questions: ", total)
    console.log("Your score for ", this.state.wineData.name, ": ", this.state.score, "%")
    console.log("SCORE" + this.state.score);
    this.addScore()
  }

  handleQuizPageBtn = id => {
    const getQuiz = { id: id, restaurantId: this.state.user.restaurantId };
    console.log("??????????????");
    console.log(getQuiz);
    console.log("??????????????");
    // const deleltData = {id: id, restaurantId: this.state.restaurantId}

    API.getQuiz(getQuiz).then(res =>

      this.componentDidMount()
    )
  }

  addScore = () => {
    const scoreData = { userId: this.state.user._id, wine: this.state.wineData.name, score: this.state.score }
    console.log(scoreData);
    API.addScore(scoreData).then(res => {
      console.log("ADDSCORE");
      console.log(res);
      console.log(res.data.scores);
      this.props.history.push('/employeepage');
    })
  }

  // renders react elements into the DOM
  render() {
    console.log('clicked wine id:', this.props.location.state.wineId)
    console.log(this.props.location.state.wineName);
    return (
      // the parent div into which our components will be rendered
      <div className="background">

        <Wrapper>
          <div className="qcardwrapper1">
            <div className="qcardwrapper2">
              {/* Map over this.state.characters and render a CharacterCard component for each character object */}
              {this.state.filteredQs.map(filteredQ => (

                <QuestionCard
                  // functions to be inherited as props
                  handleBtnClick={this.handleBtnClick}
                  handleInputChange={this.handleInputChange}
                  handleCheckFlavor={this.handleCheckFlavor}
                  shuffle={this.shuffle}

                  //values to be inherited as props
                  id={filteredQ.id}
                  key={filteredQ.id}
                  question={filteredQ.question}
                  answers={filteredQ.falseAnswers}
                  category={filteredQ.category}
                  wineName={this.state.wineData.name}
                  sweetness={this.state.wineData.sweetness}
                  body={this.state.wineData.body}
                  tannin={this.state.wineData.tannin}
                  acidity={this.state.wineData.acidity}
                  alcohol={this.state.wineData.alcohol}
                  temp={this.state.wineData.temp}
                  decant={this.state.wineData.decant}
                  ageability={this.state.wineData.ageability}
                  region={this.state.wineData.region}
                  counter={this.state.counter}
                  submitFlavor={this.state.submitFlavor}
                />
              ))}
            </div>
          </div>
        </Wrapper>

        <div className="submitanswersbtnquizwrap">
          <div className="submitanswersbtnquiz">
            <button className="submitFinal" onClick={this.handleScoreCalc}>Submit Answers</button>

            <Link to="/employeepage"><button className="closebtnquiz">maybe next time
            </button></Link>
          </div>
        </div>

      </div>
    );
  }
}

export default Quiz;
