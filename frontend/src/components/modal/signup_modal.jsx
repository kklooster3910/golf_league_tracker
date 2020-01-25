import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import SignUpForm from "./signup_form";

import "./signupmodal.scss";

/**
 * Hook that alerts clicks outside of the passed ref
 */
// function useOutsideAlerter(ref) {
//   /**
//    * Alert if clicked on outside of element
//    */
//   function handleClickOutside(event) {
//     if (ref.current && !ref.current.contains(event.target)) {
//       alert("You clicked outside of me!");
//     }
//   }

//   useEffect(() => {
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   });
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// export default function OutsideAlerter(props) {
//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }

// CLEAN UP THIS CODE FOOL!!! THIS IS A COOL PATTERN!!! --

// you use these functions in multiple files... you need to start making a utils
// file that does some more thangs my friend

const SignUpModal = ({ isSignUpModalOpen, setIsSignUpModalOpen }) => {
  const rootElement = document.getElementById("root");
  const me = useRef(null);
  // handleOutsideClick(me);

  useEffect(() => {
    // const appBody = document.getElementById("appMain");
    rootElement.addEventListener("click", handleOutsideClick(me));
    // appBody.addEventListener("click", el => console.log(el));

    return () => {
      rootElement.removeEventListener("click", handleOutsideClick(me));
    };
  }, []);

  const handleOutsideClick = ref => {
    //    * Alert if clicked on outside of element
    //    UNDERSTAND THIS BETTER!
    return event => {
      debugger;
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    };
    // console.log(me.current);
  };

  // const handleOutsideClick = () => {};

  // const modalClasses = classNames(
  //   "signupmodal-container",
  //   `${isSignUpModalOpen ? "open" : "close"}`
  // );

  return (
    <div className="signupmodal-container" ref={me}>
      <SignUpForm />
    </div>
  );
};

export default connect(null, null)(SignUpModal);
