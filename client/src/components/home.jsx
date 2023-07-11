import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthProvider";
import bigburger from "../assets/bigburger.jpg";

export function Homepage() {
  try {
    const { loggedIn } = useContext(AuthContext);
    return (
      <>
        <div id="bigBurger2">
          <h1 className="landertext">
            THE ORIGINAL BURGER JOINT BEFORE MC**ALD'S
          </h1>
        </div>
        <div className="flexImage">
          <div>
            <h2 id="dah2">The Burger Above Their Burger</h2>
            <p>
              Have a taste of our world-renowned* Burger & Fries! We have a
              variety of foods sure to satisfy your appetite, whether it's a
              juicy burger, our specially seasoned fries, or one of our
              refreshing beverages!
            </p>
            <button>ABOUT US</button>
          </div>
        </div>
        <div className="flexImage">
          <div>
            <div id="fries">
              <h4 className="product">Seasoned Crispy Fries</h4>
              <p>
                <a className="productbtn" href="/menu">
                  Order Online
                </a>
              </p>
            </div>
          </div>
          <div>
            <div id="chickenburger">
              <h4 className="product">Chicken Burger</h4>
              <p>
                <a className="productbtn" href="/menu">
                  Order Online
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1>"The Best Burger I Ever Had"</h1>
          <p>- Satisfied Customer</p>
        </div>
        <div id="bigBurger">
          <img src={bigburger} alt="Big Burger" />
        </div>
        <div>
          <h1>Order Online or Come Visit Us Today</h1>
          {loggedIn ? (
            <a className="getStarted" href="/shoppingcart">
              Get Started
            </a>
          ) : (
            <a className="getStarted" href="/login">
              Log In
            </a>
          )}
        </div>
      </>
    );
  } catch (error) {}
}
