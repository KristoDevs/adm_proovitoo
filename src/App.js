import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import './App.css';

import Shipments from './data/shipments.json';

import Header from './components/Header/Header';
import CompanyItem from './components/CompanyItem/CompanyItem';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';

function App() {
  const [shipments, setShipments] = useState(null);
  const [search, setSearch] = useState('');
  const profile = useRef(null);

  let companyItems;
  let companyItemsRoutes;

  const loadShipments = () => {
    setShipments(Shipments);
  };

  const shipmentsToStorage = () => {
    if (shipments === null) {
      setShipments(JSON.parse(localStorage.getItem('shipments')));
    } else {
      let serialized_shipments = JSON.stringify(shipments);
      localStorage.setItem('shipments', serialized_shipments);
    }
  };

  const getShipmentNames = (state) => {
    return state
      .map((shipment) => {
        return shipment.name;
      })
      .filter((shipment) => {
        return shipment.toLowerCase().includes(search.toLowerCase());
      });
  };

  const updateBoxes = (e, state, shipment) => {
    let regEx = /[a-zA-Z]/g;
    let newValue;
    newValue = state.map((updateShipment) => {
      if (updateShipment.boxes === shipment.boxes) {
        if (regEx.test(e.target.value)) {
          e.preventDefault();
          return updateShipment;
        } else return { ...updateShipment, boxes: e.target.value };
      } else return updateShipment;
    });

    setShipments(newValue);
  };

  const goToProfile = () => {
    window.scrollTo({
      top: profile.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const mapCompanyItems = (shipmentNames) => {
    return shipmentNames.map((shipment) => {
      return (
        <Link key={shipment} ref={profile} to={`/${shipment}`}>
          <CompanyItem shipmentName={shipment} toProfile={goToProfile} />
        </Link>
      );
    });
  };

  const mapProfiles = (shipments) => {
    return shipments
      .map((shipment) => {
        return shipment;
      })
      .map((shipment) => {
        let boxes;
        if (!shipment.boxes) {
          boxes = '';
        } else {
          boxes = shipment.boxes;
        }

        const calculateBays = (cargoBoxesPerBay) => {
          if (shipment.boxes === null) {
            return 'Currently no cargo boxes';
          }

          let boxes = shipment.boxes;
          let arr = boxes.split(',');
          let sum = 0;

          arr.forEach((number) => {
            sum += parseFloat(number);
          });

          return Math.ceil(sum / cargoBoxesPerBay);
        };

        return (
          <Route
            key={shipment.id}
            exact
            path={`/${shipment.name}`}
            render={() => (
              <CompanyProfile
                key={shipment.id}
                company={shipment.name}
                email={shipment.email}
                cargoBays={calculateBays(10)}
                labelTitle='Cargo boxes:'
                cargoBoxes={boxes}
                changedValue={(e) => updateBoxes(e, shipments, shipment)}
              />
            )}
          />
        );
      });
  };

  if (shipments === null && localStorage.length === 0) {
    companyItems = <li>{'Please load shipments!'}</li>;
  } else if (shipments === null) {
    const deserialized_shipments = JSON.parse(
      localStorage.getItem('shipments')
    );
    const shipmentNamesFromStorage = getShipmentNames(deserialized_shipments);

    companyItems = mapCompanyItems(shipmentNamesFromStorage);

    companyItemsRoutes = mapProfiles(deserialized_shipments);
  } else {
    const shipmentNames = getShipmentNames(shipments);

    companyItems = mapCompanyItems(shipmentNames);

    companyItemsRoutes = mapProfiles(shipments);
  }

  return (
    <div className='App'>
      <Header
        title='Cargo Planner'
        searchFilter={(e) => setSearch(e.target.value)}
        fetchData={loadShipments}
        saveData={shipmentsToStorage}
        title1='Load'
        title2='Save'
      />

      <Router>
        <ul className='company'>{companyItems}</ul>
        <Switch>
          {companyItemsRoutes}
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
