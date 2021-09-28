import './Slider.css';
import React from 'react';

class Slider extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      slider: {
        name : this.props.name,
        min : this.props.min,
        max : this.props.max,
        unit : this.props.unit,
        step : this.props.step,
        value : this.props.min
      }
    }
    this.sliderOnChange = this.sliderOnChange.bind(this);
  }

  /**
   * Change la valeur du slider
   * @param {Event} event 
   */
  sliderOnChange(event) {
    let slider = this.state.slider
    slider.value = event.target.value;

    //Rajoute un s à "jour"
    if(slider.value > 1) {
      if(slider.unit === "Jour") {
        slider.unit = "Jours";
      }
    } else {
      if(slider.unit === "Jours") {
        slider.unit = "Jour";
      }
    }

    this.setState({slider}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  render() {
    const { slider } = this.state
    const options = []

    for (let index = 0; index < slider.max; index += (slider.step * 5)) {
      options.push(<option key={index + slider.name}>{index}</option>)
    }

    return (
      <div className="w-responsive mt-4 mb-0">
        <label>{slider.name}</label>
        <input className="w-100" type="range" min={slider.min} max={slider.max} step={slider.step} value={slider.value} list={"steplist" + slider.name} onChange={this.sliderOnChange}/>
        <output id="output">{slider.value} {slider.unit}</output>
        <datalist id={"steplist" + slider.name}>
            {options}
        </datalist>
      </div>
    )
  }
}

export {Slider};
