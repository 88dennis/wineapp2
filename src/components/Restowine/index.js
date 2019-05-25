import React from "react";
import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

function Restowine({handleWineDelete, name, id, hideShow, showMe, wineName, wineId, winetemp, winetannin, winesweetness, winesummary, winepronunciation, wineprimaryFlavors, winepairings, winedecant, wineglassType, winebody, winealcohol, wineageability, wineacidity}) {
  return (
    <div>
    <ListItem>
        <div className="listitemdiv3">
        <div className="winecollectiondiv1">
        <div className="winecollectionname1">
        {/* <div className="fontitalicsmall">{name}</div> */}
        <div><button className="winenamebtn1" onClick={() => hideShow(id)}>{name}</button></div>
        <div><button className="winedelbtn" onClick={() => handleWineDelete(id)}><i className="fas fa-minus-circle"></i></button></div>
          </div>
          {/* <div><Link
            className="nav-link" 
            to="/quiz"
          ><button>
            Quiz Page
            </button>
              </Link></div> */}
          <div className="fontitalicbarcode">Product Id: {id}</div>

          <div>
              {showMe ?
                <div className="overlayRestowine" onClick={() => hideShow(id)}>
                  <div className="restowineinfo1">
                    <div className="restowineinfo2">
                      <div className="restowineinfo3">
                        <div className="infowinewrap">

                          <div className="infodetails">Name: {wineName}</div>
                          <div className="infodetails">Acidity: {wineacidity}</div>
                          <div className="infodetails">Ageabilty: {wineageability}</div>
                          <div className="infodetails">Alcohol: {winealcohol}</div>
                          <div className="infodetails">Body: {winebody}</div>
                          <div className="infodetails">Decant: {winedecant}</div>
                          <div className="infodetails">Glass Type: {wineglassType}</div>
                          <div className="infodetails">Pairings: {winepairings}</div>
                          <div className="infodetails">Flavors: {wineprimaryFlavors}</div>
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

export default Restowine;
