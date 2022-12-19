import { useCallback, useEffect } from "react";

import useAppSelector from "./useAppSelector";
import { setIsHiddenOverflow } from "../store/app";
import useAppDispatch from "./useAppDispatch";

type ReturnedType = {
  isHiddenOverflow: boolean,
  setIsHidden: (p: boolean) => void,
};

const useHideOverflow = (): ReturnedType => {
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const isHiddenOverflow = useAppSelector((state) => state.app.isHiddenOverflow);

  const dispatch = useAppDispatch();

  const changeOverflow = useCallback((isHidden: boolean) => {
    if (isHidden) {
      document.body.style.overflow = "hidden";
      if (!isMobile) {
        document.body.style.marginRight = "17px";
      } else {
        document.body.style.marginRight = "0";
      }
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0";
    }
  }, [isMobile]);

  const setIsHidden = (isHidden: boolean) => {
    dispatch(setIsHiddenOverflow(isHidden));
  };

  useEffect(() => {
    changeOverflow(isHiddenOverflow);
  }, [changeOverflow, isHiddenOverflow]);

  return {
    isHiddenOverflow,
    setIsHidden,
  };
};

export default useHideOverflow;
