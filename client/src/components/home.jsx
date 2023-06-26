import React, { useState } from "react";
import bigburger from "../assets/bigburger.jpg";

export function Homepage() {
  try {
    // const {user} = require("../") missing use context + use auth
    return (
      <>
        <div
          className="landerlogo"
          style={{ backgroundImage: `url(${bigburger})` }}
        >
          <h1 className="landertext">
            THE ORIGINAL BURGER JOINT BEOFRE MC**ALD'S
          </h1>
        </div>
        <div className="flex">
          <h2>the burger above their burger</h2>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem nihil accusantium, laborum voluptatibus repellendus
              aspernatur veritatis animi aliquam praesentium, tempore
              reprehenderit rem culpa porro facere qui eaque atque eveniet
              magni.
            </p>
            <button>about us</button>
          </div>
        </div>
        <div>
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(http://placekitten.com/g/500/300)`,
                width: `100%`,
              }}
            >
              <h4>productname</h4>
              <p>order online</p>
            </div>
            <div
              style={{
                backgroundImage: `url(http://placekitten.com/g/500/800)`,
                width: `100%`,
              }}
            >
              <div>
                <h4>productname</h4>
                <p>order online</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>the best burger i ever had</h1>
        </div>
        <div>
          <img src="http://placekitten.com/1500/500" alt="" />
        </div>
        <div>
          <h1>order online or come visit us today</h1>
          <button>get started</button>
        </div>
      </>
    );
  } catch (error) {}
}
