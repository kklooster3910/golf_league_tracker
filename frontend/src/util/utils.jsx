/***
 *  @params {ref} ref object of what you want to click outside of - ref needs current
 *  @params {stateFunction} ex: setIsLoginModalOpen - hook setState function
 *  @params {isELementOpen} ex: isLoginModalOpen - hook useState var
 */

export const handleOutsideClick = (ref, closeElementFunc, isElementOpen) => {
  return event => {
    if (ref.current && !ref.current.contains(event.target) && isElementOpen) {
      closeElementFunc(false);
    }
  };
};
