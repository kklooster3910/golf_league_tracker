/***
 *  @param {ref} ref object of what you want to click outside of - ref needs current
 *  @param {stateFunction} function  setIsLoginModalOpen(boolean) {}
 *  @param {isELementOpen} boolean: isLoginModalOpen - hook useState var
 */

export const handleOutsideClick = (ref, closeElementFunc, isElementOpen) => {
  return event => {
    if (ref.current && !ref.current.contains(event.target) && isElementOpen) {
      closeElementFunc(false);
    }
  };
};
