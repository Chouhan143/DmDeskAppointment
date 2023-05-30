import React, {createContext, useEffect, useState,useContext} from 'react';
import {Get_Appointment_DataBy_Steno,Get_Appointment_Data} from '../../Constants/UrlConstants';
import {getData} from '../../Hooks/ApiHelper';

const DataContext = createContext();

export function DataContextApiProvider({children}) {
  const [data, setData] = useState([]);
  const [count, setcount] = useState(0)
 const [stnData,setStnData]=useState([]);
  useEffect(() => {
    getDataFunc();
    StnApiData();
  }, [count]);

  useEffect(() => {
    StnApiData();
  }, []);




  const getDataFunc = async () => {
    const dataResides123 = await getData(Get_Appointment_Data);
    await setData(dataResides123.result)
  };


  const StnApiData = async () =>{
    axios.get('https://srninfotech.com/projects/dmdesk_steno/getAppointmentBySteno')
    .then(response => {
      const data123 = response.data.result;
      setStnData(data123);
      console.log("context check",data123)
    });
  }

 



  return (
    <DataContext.Provider value={{stnData,setStnData,data, setData,StnApiData, getDataFunc,setcount,count, }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
