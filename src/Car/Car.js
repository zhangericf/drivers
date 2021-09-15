import './Car.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Car extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      car: this.props.carInfo,
      prices: this.props.carPrices
    }
  }

  /**
   * Calcule le montant de la réduction selon la durée de la location
   * @param {int} duration durée de la location 
   * @param {int} totalDays prix pour la durée louée
   * @returns {array : { discount, percent }} un tableau contenant le montant de la réduction et le pourcentage de réduction
   */
  getDaysDiscount(duration, totalDays) {
    let discountInfo = {};

    if(duration >= 1)
      discountInfo = { discount : totalDays * 0.1, percent : "10%" };
    if(duration >= 4)
      discountInfo = { discount : totalDays * 0.3, percent : "30%" };
    if(duration >= 10)
      discountInfo = { discount : totalDays * 0.5, percent : "50%" };

    return discountInfo;
  }

  render() {
    const { car } = this.state
    const { prices } = this.state
    const totalDays = car.pricePerDay * prices.duration;
    const totalKms = car.pricePerKm * prices.distance;
    let discount = this.getDaysDiscount(prices.duration, totalDays);

    return (
      <div className="Car">
        <div><img src={this.props.baseURL + car.picturePath} alt="voiture"></img></div>
        <div className="d-flex carInfo">
          <div className="w-50">
            <div> Marque : {car.brand} </div>
            <div> Model : {car.model} </div>
            <div> Coût par jour : {car.pricePerDay}€ </div>
            <div> Coût par km : {car.pricePerKm}€ </div>
          </div>
          <div className="hr"></div>
          <div className="w-50 text-right">
            <div> {car.pricePerDay} x {prices.duration} j = {totalDays}€ </div>
            <div> {car.pricePerKm} x {prices.distance} km = {totalKms}€ </div>
            <div> Réduction -{discount.percent} (-{discount.discount}€)</div>
            <div> Prix total de la location : {totalDays + totalKms - discount.discount}€ </div>
          </div>
        </div>
      </div>
    )
  }
}

export {Car};
