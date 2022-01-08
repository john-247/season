import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner.js";

// import faker from "faker";
// live-reloading
if (module.hot) {
  module.hot.accept();
}
//functional component

//in this method new data cannot e rendered in jsx
//ex: latitude cannot be inserted inside App component,
// so we use class based component

// const App = function () {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude: lat } = position.coords;
//       const { longitude: long } = position.coords;
//       console.log(lat, long);
//     },
//     (err) => console.log(err)
//   );
//   return (
//     <div>
//       <SeasonDisplay />
//     </div>
//   );
// };

// class based component

class App extends React.Component {
  // method 1 of initializing state

  //   constructor(props) {
  //     super(props);

  //     this.state = { lat: null, long: null, errorMessage: "" };
  //   }

  // method 2 of intializing state

  state = { lat: null, errorMessage: "" };

  // perfect metod to do some intial data-loading,api,location requests.
  // this method is invoked only once.

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat } = position.coords;
        const { longitude: long } = position.coords;
        this.setState({ lat, long });
        console.log(lat, long);
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  renderContent() {
    // conditional rendering
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error:{this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner text="Please accept location request" />;
  }

  render() {
    // return (
    //   <div>
    //     Latitude: {this.state.lat}
    //     <br /> Longitude: {this.state.long}
    //     <br /> Error:{this.state.errorMessage}
    //   </div>
    // );
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
