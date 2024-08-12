import { createContext, useState, useEffect, useContext } from "react";

interface DateContextType {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export const DateContext = createContext<DateContextType>({
  date: undefined,
  setDate: () => {},
});

export const DateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    const getDate = () => {
      const now = new Date();
      setDate(now);
    };

    getDate();
    const refreshTime = setInterval(getDate, 60000);

    return () => clearInterval(refreshTime);
  }, []);

  return (
    <DateContext.Provider value={{ date, setDate }}>{children}</DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
