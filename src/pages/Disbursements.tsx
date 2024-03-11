import { BsDownload } from 'react-icons/bs';
import { useTable } from '../hooks/useTable';
import { Grupo258 } from '../assets/index';
import { TableFilter } from '../components/TableFilter';
import { getData } from '../data';
import { Pagination } from '../components/Pagination';
import '../scss/_disbursements.scss';
import * as XLSX from 'xlsx'
import { LuArrowDownToLine } from "react-icons/lu";
import { useAuthStore } from '../store/auth.store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';



export const Disbursements = () => {

  const { handlePageChange, page, limit, setLimit, setPage, pageNum, totalPage } = useTable();
  const changeStateAuthentication = useAuthStore(state => state.changeStateAuthentication);

  const exportToExcel = () => {
    const table = document.getElementById("data-table-container");
    const workBook = XLSX.utils.table_to_book(table);
    return XLSX.writeFile(workBook, "Report.xlsx");
  }

  useEffect(() => {

    setTimeout(() => {
      toast((t) => (
        <div className='bg-white relative'>
          <span className='text-wrap'>Pedro Peréz ha hecho una compra por valor de </span>
          <strong>$1.800.000</strong>
          <button onClick={() => toast.dismiss(t.id)} className='border-0 shadow-md px-1 py-0 bg-red-500 absolute top-[-45%] right-[-8%] text-xs text-white cursor-pointer rounded-lg'>
            &times;
          </button>
        </div >
      ), { position:'bottom-right',  }
      );
    },);

  }, []);



  return (
    <main className="container-table">
      <div className="header">
        <img src={Grupo258} alt="logo sufipay" className="logo-sufipay" />
        <button type='button' className="btnLogout" onClick={() => changeStateAuthentication(false)}>
          Cerrar sesión
          <BsDownload size={30} color="black" className="logout-icon" />
        </button>
      </div>
      <div className="title-disbursement">
        <h1>Mis desembolsos</h1>
        <button className="btnDownload" onClick={() => exportToExcel()} >
          <LuArrowDownToLine
            size={24}
            color="white"
            className="download-icon"
          />
          Descargar
        </button>
      </div>
      <div className="table-filter-container">
        <TableFilter page={pageNum} limit={limit} />
        <Pagination
          page={pageNum}
          limit={limit}
          setPage={setPage}
          onPageChange={handlePageChange}
          totalPage={totalPage}
          setLimit={setLimit}
          data={getData(page, limit)}
        />
      </div>
    </main>
  )
}
