import '../scss/_pagination.scss';
import { IoChevronBackSharp, IoChevronForwardSharp  } from "react-icons/io5";


interface Props {
    page: number;
    limit: number;
    setPage: any;
    onPageChange: any;
    totalPage: number;
    setLimit: any;
    data: any;
}

export const Pagination = ({ data, limit, onPageChange, page, setLimit, setPage, totalPage }: Props) => {
  return (
    <nav id="pagination">
      <ul className="pagination">
        <li className="page-item">
          <button type='button' className="page-button" onClick={() => onPageChange(1)}>
            <IoChevronForwardSharp color='red' className='left' size={20}/>
          </button>
        </li>
        <li className='historial'>
              <span>{page}</span>
              <span>de {totalPage}</span>
        </li>
        <li className="page-item">
          <button type='button' className="page-button" onClick={() => onPageChange(-1)}>
            <IoChevronBackSharp color='red' className='right' size={20}/>
          </button>
        </li>
      </ul>
      <div className="select-pagination">
        <select onChange={(event) => setLimit(event.target.value)} id="select-pagination">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
        <label id="label-select" htmlFor="select-pagination">Registros por página</label>
        <i></i>
      </div>
    </nav>
  )
}
