import React from 'react';

import { FaSearch } from 'react-icons/fa';
import classes from './Header.module.css';

export default function Header(props) {
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <h2>{props.title}</h2>
        <div className={classes.searchContainer}>
          <FaSearch className={classes.searchIcon} />
          <input
            className={classes.searchBar}
            type='text'
            name='searchbar'
            placeholder='Search'
            onChange={props.searchFilter}
          />
        </div>
        <div className={classes.headerButtons}>
          <button
            className={classes.headerButton}
            onClick={props.fetchData}
            type='button'
          >
            {props.title1}
          </button>
          <button
            className={classes.headerButton}
            onClick={props.saveData}
            type='button'
          >
            {props.title2}
          </button>
        </div>
      </div>
    </header>
  );
}
