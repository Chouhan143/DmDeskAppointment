import React, {createContext, useEffect, useState,useContext} from 'react';
import {Get_Appointment_Data} from '../../Constants/UrlConstants';
import {getData} from '../../Hooks/ApiHelper';

const DataContext = createContext();

export function DataContextApiProvider({children}) {
  const [data, setData] = useState([]);
  const [count, setcount] = useState(0)

  useEffect(() => {
    getDataFunc();
  }, [count]);
// console.log(count)

  const getDataFunc = async () => {
    // console.log("run")
    const dataResides = await getData(Get_Appointment_Data);
    await setData(dataResides.result)
  //  console.log(dataResides.result)
  };

  return (
    <DataContext.Provider value={{data, setData, getDataFunc,setcount,count }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
