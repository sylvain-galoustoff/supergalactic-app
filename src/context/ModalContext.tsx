import { createContext, useContext, useState } from "react";

type ModalContextType = {
  box: JSX.Element | null;
  setBox: (box: JSX.Element | null) => void;
};

export const ModalContext = createContext<ModalContextType>({
  box: null,
  setBox: () => {},
});

export const ModalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [box, setBox] = useState<JSX.Element | null>(null);
  const valueModalContext = { box, setBox };

  return (
    <ModalContext.Provider value={valueModalContext}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
