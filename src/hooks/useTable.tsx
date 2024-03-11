import { useState } from "react";
import { getLength } from "../data";



export const useTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
  
    const totalPage = Math.ceil(getLength() / limit);
    let pageNum: number;
    if (page <= totalPage) {
      pageNum = page;
    } else {
      setPage(totalPage);
      pageNum = page;
    }
  
    const handlePageChange = (value: number) => {
      if (value === 1) {
        if (page === totalPage) {
          console.log("true");
          return null;
        } else {
          setPage((prevState) => prevState + 1);
        }
      } else {
        if (page === 1) {
          return null;
        } else {
          setPage((prevState) => prevState - 1);
        }
      }
    };
  
    return {
        setLimit,
        page, 
        limit,
        setPage,
        pageNum,
        totalPage,
        handlePageChange

  }
}
