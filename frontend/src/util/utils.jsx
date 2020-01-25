/***
 *  @params {ref} ref object of what you want to click outside of - ref needs current
 *  @params {stateFunction} ex: setIsLoginModalOpen
 *  @params {isELementOpen} ex: isLoginModalOpen
 */

export const handleOutsideClick = (ref, stateFunction, isElementOpen) => {
  return event => {
    if (ref.current && !ref.current.contains(event.target) && isElementOpen) {
      stateFunction(false);
    }
  };
};
