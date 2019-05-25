import React from "react";
import { ListItem } from "../List";
// import { Link } from "react-router-dom";

import "./style.css";

// subtitle, authors, link, description, 
function Wine({ name, id, hideShow, showMe, handleWineAdd,wineName, wineId, winetemp, winetannin, winesweetness, winesummary, winepronunciation, wineprimaryFlavors, winepairings, winedecant, wineglassType, winebody, winealcohol, wineageability, wineacidity}) {

  return (
    <div>
      <ListItem>
        <div className="listitemdiv">
          <div className="winenamediv">

          <div className="winenamediv2">
               <div><button className="winenamebtn" onClick={() => hideShow(id)}>{name}</button></div>
               <div><button className="btnadd" onClick={() => handleWineAdd(id)}><i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i></button></div>   
               </div>
            
            <div className="fontitalicbarcode">{id}</div>

            <div>
              {showMe ?
                <div className="overlay4b" onClick={() => hideShow(id)}>
                  <div className="wrapinfo1">
                    <div className="wrapinfo2">
                      <div className="wrapinfo3">
                        <div className="infowrap">

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
                        {/* <button onClick={() => hideShow(id)}>CLOSE</button> */}
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

export default Wine;
