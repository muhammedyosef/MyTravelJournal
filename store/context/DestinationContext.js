import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const DestinationContext = createContext();
export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const loadDestinations = async () => {
      const storedDestinations = await AsyncStorage.getItem("destinations");
      if (storedDestinations) {
        setDestinations(JSON.parse(storedDestinations));
      }
    };
    loadDestinations();
  }, []);
  useEffect(() => {
    const saveDestinations = async () => {
      await AsyncStorage.setItem("destinations", JSON.stringify(destinations));
    };
    saveDestinations();
  }, [destinations]);
  const addDestination = async (destination) => {
    setDestinations((prevDestinations) => [...prevDestinations, destination]);
  };
  return (
    <DestinationContext.Provider value={{ destinations, addDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
