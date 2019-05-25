import React from "react";
import { ListItem } from "../List";
import { Link } from "react-router-dom";

import "./style.css";

function SavedWine({name, id, hideShow, showMe, wineName, wineId, winetemp, winetannin, winesweetness, winesummary, winepronunciation, wineprimaryFlavors, winepairings, winedecant, wineglassType, winebody, winealcohol, wineageability, wineacidity}) {
  return (
    <div>
      
    <ListItem>
        <div className="listitemdiv3">
        <div className="emppagewinecollectiondiv1">
        <div className="winecollectionname1">
        {/* <div className="fontitalicsmall">{name}</div> */}
        <div><button className="winesavenamebtn1" onClick={() => hideShow(id)}>{name}</button></div>

        {/* <div>{score}</div> */}
        <div>

{/*            
          <button className="quizpagebutton" onClick={() => hideShowQuiz(id)}>
            Quiz MODAL
            </button> */}

            <div><Link
            className={window.location.pathname === "/quizpage" ? "nav-link active" : "nav-link"} 
            // to="/quiz"
            to={{pathname:"/quiz", state:{wineId: id, wineName:name}}}
          ><button className="quizpagebutton"><i className="fas fa-feather-alt"></i>
            </button>
              </Link></div>
              </div>
        {/* <div><button className="winedelbtn" onClick={() => handleWineDelete(id)}>Delete</button></div> */}
          </div>

          
          {/* <div className="font-italic">{id}</div> */}

          <div>
              {showMe ?
                <div className="overlay5" onClick={() => hideShow(id)}>
                  <div className="wineinfo1">
                    <div className="wineinfo2">
                      <div className="wineinfo3">
                        <div className="infowinewrap">

                        <div className="infodetails">Name: {wineName}</div>
                          <div className="infodetails">Acidity: {wineacidity}</div>
                          <div className="infodetails">Ageabilty: {wineageability}</div>
                          <div className="infodetails">Alcohol: {winealcohol}</div>
                          <div className="infodetails">Body: {winebody}</div>
                          <div className="infodetails">Decant: {winedecant}</div>
                          <div className="infodetails">Glass Type: {wineglassType}</div>
                          <div className="infodetails">Pairings: {winepairings}</div>
                          
                          
                          <div className="infodetails">Flavors:</div>
                          {wineprimaryFlavors.map(flavor => {
                            return (
                              <div>
                              <li className="travelcompany-input">
                              <span className="input-label">{flavor}</span>
      
  </li>
</div>
                                       
                            )
                        })
                       }


                          <div className="infodetails">Pronunciation: {winepronunciation}</div>
                          <div className="infodetails">Summary: {winesummary}</div>
                          <div className="infodetails">Sweetness: {winesweetness}</div>
                          <div className="infodetails">Tannin: {winetannin}</div>
                          <div className="infodetails">Temp: {winetemp}</div>
                          <div className="infodetails">Id: {wineId}</div>
                        </div>

                        <br></br>

                      </div>
                      <div className="btnwrap">
                        {/* <button><Link
                          className={window.location.pathname === "/admin" ? "nav-link active" : "nav-link"}
                          to="/admin"
                        >
                          admin
          </Link></button> */}
<button className="btnwrap1buserclose" onClick={() => hideShow(id)}><i className="fas fa-times-circle"></i></button>
                         </div>
                    </div>
                  </div>
                </div>
                : null
              }
            </div>
          </div>
          </div>
    </ListItem>
    </div>
  );
}

export default SavedWine;
