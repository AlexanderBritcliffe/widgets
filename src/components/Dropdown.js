import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;

        //event object comes along with any event listener
        //is the element that was clicked on inside of our component if it is return early
        // if not close the dropdown with a set open with false
      }
      setOpen(false);
    };
      document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, { capture: true
      });
    };
  }, []);

  //when are component is first rendered into the dom we will run use effect one time
  //at that point we set up event listener then when dropdown
  //is about to be removed from dom react automatically
  //calls cleanup which removes even listener watching for that click





    //when we remove dropdown from the DOM we need to turn off above event listener

    //when click on option it returns early we do not attempt to call
    //set open with false so we flip
    //open piece of state to opposite
    // of what it currently is which will
    // close it up...when you click outside
    // what we click was not contained inside of ref so we do not return early and dropdown closes

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
       key={option.value}
       className="item"
       onClick={() => onSelectedChange(option)}
       >
       {option.label}
      </div>
    );
  });



  return (
    <div ref={ref}  className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`} //if open is true then add visible active to overall string if false put in empty string
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
