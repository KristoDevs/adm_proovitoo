import classes from './CompanyItem.module.css';
import React from 'react';

export default function CompanyItem(props) {
  return (
    <li className={classes.listItem} onClick={props.toProfile}>
      {props.shipmentName}
    </li>
  );
}
