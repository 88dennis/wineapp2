import React from "react";
import "./style.css";

// class component QuestionCard(props) {
class QuestionCard extends React.Component {

    answers = this.props.answers;
    falses = this.answers ? this.answers.splice(this.answers.indexOf(this.props[this.props.category]), 0) : null;
    shuffledFalses = this.answers ? this.props.shuffle(this.answers) : null;
    selections = this.answers ? (this.answers.slice(0, 3)) : null;
    dummThing = this.selections ? (this.selections.push(this.props[`${this.props.category}`])) : null;
    shuffledSelections = this.selections ? this.props.shuffle(this.selections) : null;


    constructor(props) {
        super(props);
        this.state = {
            bgColor: [
                '#f89406',
                '#16a085',
                '#68c3a3',
                '#89c4f4',
                '#d5b8ff',
                '#a2ded0',
                '#19b5fe',
                '#f0f0d6',
                '#f4f776',
                '#f2784b',
                '#67809f',
                '#95a5a6',
                '#f1a9a0',
                '#be90d4',
                '#22a7f0',
                '#c8f7c5',
            ],
            selectedColor: '',
        };
    }


    componentDidMount() {
        this._getRandomColor()
    }

    _getRandomColor() {
        var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
        this.setState({
            selectedColor: item,
        })
    }


    render() {
        // console.log("selections");
        // console.log(this.selections);
        return (
            <div className="qcard" style={{ backgroundColor: this.state.selectedColor }}>
                <div className="qcard2">

                    <h2 className="questionName">{this.props.question}{this.props.wineName}?</h2>
                    {/* If false answers are available, render button for each answer, else render a submit (specifically for the flavors question) */}
                    <div>
                        {this.selections ? this.selections.map(answer => {
                            return (
                                answer === this.props[`${this.props.category}`] ?
                                    <div>
                                        <button className={this.props.id} onClick={this.props.handleBtnClick}
                                            value="1">{answer}</button><br />
                                    </div> : <div>
                                        <button className={this.props.id} onClick={this.props.handleBtnClick}
                                            value="0">{answer}</button><br />
                                    </div>
                            )
                        }) :
                            <div className="AnswerButtons">
                                <input
                                    onChange={this.props.handleInputChange}
                                    value={this.props.submittedFlavor}
                                    name="submittedFlavor"
                                    type="text"
                                    placeholder="Only submit one flavor"
                                />
                                <button
                                    className="submitAnswer"
                                    onClick={this.props.handleCheckFlavor}>
                                    Submit
                            </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionCard;