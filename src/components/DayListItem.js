import React from "react";

import "components/DayListItem.scss";

const classNames = require("classnames")

export default function DayListItem(props) {
  const dayClass = classNames({"day-list__item": true}, {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots < 1})
  const remainingSpots = props.spots ? props.spots > 1 ? `${props.spots} spots remaining`: `${props.spots} spot remaining` : "no spots remaining"


  return (
    <li data-testid='day' className={dayClass} onClick={() => {props.setDay(props.name)}}>
      <h2 >{props.name}</h2> 
      <h3 >{remainingSpots}</h3>
    </li>
  );
}