import "../App.css";
import "../index.css";
import "./Gallery.css";
import AngusBurger from "../assets/AngusBurger.jpg";
import ChickenBurger from "../assets/Chicken-Burgers.jpg";
import PorkBurger from "../assets/PorkBurger.jpg";
import FishBurger from "../assets/FishBurger.jpg";
import Fries from "../assets/FriesMenu.jpg";
import IceCreamCone from "../assets/IceCreamCone.jpg";

export default function MenuGallery() {
  return (
    <div>
      <div id="header">Made Fresh Everyday!</div>
      <h1 class="gallery">Photo Gallery of Menu Items</h1>
      <div class="gallerydiv">
        <div class="gallerydivs">
          <img className="menuGallery" src={AngusBurger} alt="nature1" />
          <caption> Angus Burger $2</caption>
        </div>
        <div class="gallerydivs">
          <img className="menuGallery" src={ChickenBurger} alt="nature1" />
          <caption> Chicken Burger $2</caption>
        </div>
        <div class="gallerydivs">
          <img className="menuGallery" src={PorkBurger} alt="nature1" />
          <caption> Pork Burger $2</caption>
        </div>
        <div class="gallerydivs">
          <img className="menuGallery" src={FishBurger} alt="nature1" />
          <caption> Fish Burger $2</caption>
        </div>
        <div class="gallerydivs">
          <img className="menuGallery" src={Fries} alt="nature1" />
          <caption> Fries $2</caption>
        </div>
        <div class="gallerydivs">
          <img className="menuGallery" src={IceCreamCone} alt="nature1" />
          <caption> Ice Cream Cone $2</caption>
        </div>
      </div>
    </div>
  );
}
