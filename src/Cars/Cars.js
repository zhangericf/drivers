import './Cars.css';
import React from 'react';
import { Car } from '../Car/Car';
import { Slider } from '../Slider/Slider';

class Cars extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      cars: null,
      baseURL: "http://localhost:3001",
      searchValues : {
        duration : 1,
        distance : 50
      }
    }
  }

  componentDidMount() {
    // GET toutes les voitures
    fetch(this.state.baseURL + '/cars.json')
        .then(response => response.json())
          .then(data => this.setState({cars: data}));;
    
  }

  /**
   * Mettre à jour les critères de recherche
   * @param {Object Slider} data 
   */
  updateSearchValue(data) {
    let searchValues = this.state.searchValues
    if(data.slider.name === "Durée") {
      searchValues.duration = parseInt(data.slider.value);
    }
    if(data.slider.name === "Distance") {
      searchValues.distance = parseInt(data.slider.value);
    }

    this.setState({searchValues});
    this.updateCars();
  }

  /**
   * GET pour mettre à jour les voitures affiché selon les critères de recherche
   */
  updateCars() {
    fetch(this.state.baseURL + '/cars.json?duration=' + this.state.searchValues.duration + "&distance=" + this.state.searchValues.distance)
        .then(response => response.json())
          .then(data => this.setState({cars: data}));;
  }

  render() {
    const { cars } = this.state;
    const { baseURL } = this.state;
    const { searchValues } = this.state;

    const onChangeHandler = data => {
      this.updateSearchValue(data)
    }

    if (cars !== null) {
      var carlist = 
        cars.map(function(car){
          return <Car key={car.id} baseURL={baseURL} carInfo={car} carPrices={searchValues}/>;
        })
      return (
        <div>
          <div className="Sliders">
            <Slider onChange={onChangeHandler} name="Durée" min="1" max="30" unit="Jour" step="1"></Slider>
            <Slider onChange={onChangeHandler} name="Distance" min="50" max="3000" unit="KM" step="50"></Slider>
          </div>
          <div className="Cars">
            {carlist}
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  }
}

export {Cars};
