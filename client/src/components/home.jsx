import React from "react";
// import bigburger2 from "../assets/bigburger2.jpg";
import bigburger from "../assets/bigburger.jpg";
import fries from "../assets/fries.jpg";

export function Homepage() {
  try {
    // const {user} = require("../") missing use context + use auth
    return (
      <>
        <div id="bigBurger2">
          <h1 className="landertext">
            THE ORIGINAL BURGER JOINT BEFORE MC**ALD'S
          </h1>
        </div>
        <div className="flexImage">
          <h2 id="dah2">the burger above their burger</h2>
          <div id="textboxalign">
            <p>
              Have a taste of our world renowned* Burger & Fries!<br></br> We
              have a variety of foods sure to sate the appetite, whether its a
              juicy burgers, our specially seasoned fries, or one of our
              refershing beverages!
            </p>
            <button>about us</button>
          </div>
        </div>
        <div>
          <div className="flexImage">
            <div className="flex">
              <div id="fries">
                <h4 className="product">Seasoned Crisp Fries</h4>
                <p>
                  <a className="productbtn" href="/menu">
                    order online
                  </a>
                </p>
              </div>
            </div>
            <div className="flex">
              <div id="chickenburger">
                <h4 className="product">Chicken Burger</h4>
                <p>
                  <a className="productbtn" href="/menu">
                    order online
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>
            "The best burger I ever had"
            <br /> - satisfied customer
          </h1>
        </div>
        <div id="bigBurger">
          <img src={bigburger} alt="Big Burger IMG" />
        </div>
        <div>
          <h1>order online or come visit us today</h1>
          <button>get started</button>
        </div>
      </>
    );
  } catch (error) {}
}
