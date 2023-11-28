import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useCallback } from "react";

const useFirestoreCollection = (collectionName) => {
  const [dataList, setDataList] = useState([]);

  //useCallback bao ve getData moi khi render. 
  const getData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDataList(data);
    } catch (error) {
      console.error(`Error getting ${collectionName} data: `, error);
    }
  }, [collectionName]);

  useEffect(() => {
    getData();
  }, [collectionName, getData]); //for

  return dataList;
};

export default useFirestoreCollection;