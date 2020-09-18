import React from 'react';

import classes from './CompanyProfile.module.css';

export default function CompanyProfile(props) {
  return (
    <div className={classes.profileContainer}>
      <h1>{props.company}</h1>
      <a href={`mailto:${props.email}`}>{props.email}</a>
      <p>Number of required cargo bays: {props.cargoBays}</p>
      <label className={classes.label}>{props.labelTitle}</label>
      <input
        className={classes.cargoBoxes}
        type='text'
        name='cargoboxes'
        value={props.cargoBoxes}
        onChange={props.changedValue}
        onKeyDown={props.keyDown}
      />
    </div>
  );
}
