import { useState } from "react";
import { getData } from "../data";
import '../scss/_table-filter.scss';
import { FaRegCalendarDays } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { DataInterface } from "../interfaces/data.interface";

interface Props {
    page: number;
    limit: number;
}

interface FilterInputs {
  type_document: string;
  num_document: string;
  num_disbursement: string;
  date_since: Date;
  date_until: Date;
}

export const TableFilter = ({ page, limit }: Props) => {

    const [search, setSearch] = useState("");
    const data = getData(page, limit);
    const { register, getValues } = useForm<FilterInputs>();
    

    const focusDatePicker = () => {
      const inputDate: HTMLInputElement | null = document.querySelector('date_since');
      if ( inputDate ) {
        inputDate.focus();
      }
    }

    let arrayData: DataInterface[] = [];
    if(!search) {
      arrayData = data;
    } else {
      if (document.getElementById("num_document")?.value !== "") {
        arrayData = data.filter((item) => {
          return item.document_number.toLowerCase().includes(search.toLowerCase());
        });
      } else {
        if (document.getElementById("num_disbursement")?.value !== "") {
          arrayData = data.filter((item) => {
            return item.disbursement_number.toLowerCase().includes(search.toLowerCase());
          });
        } else {
          if (document.getElementById("type_document")?.value !== "") {
            arrayData = data.filter((item) => {
              return item.document_type.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            });
          } else {
            if (document.getElementById("date_since")?.value !== "" && document.getElementById("date_until")?.value !== "") {
              arrayData = data.filter((item) => {
                const parts = item.date_hour.split('/');
                const day = parseInt(parts[2], 10);
                const month = parseInt(parts[1], 10) - 1;
                const year = parseInt(parts[0], 10);
                const newDate = new Date(year, month, day).toLocaleDateString();
                const sinceDate = new Date(getValues('date_since')).toLocaleDateString();
                const untilDate = new Date(getValues('date_until')).toLocaleDateString();
                return newDate >= sinceDate && newDate <= untilDate;
              });
            }
          }
        }
      }
    }

    console.log({search});
  

  return (
    <>
      <div className="filter-container">
        <div className="custom-select">
          <select
            className="type_document"
            id="type_document"
            {...register('type_document')}
            aria-placeholder="Tipo doc."
            onChange={(event) => setSearch(event.target.value)}
          >
            <option value="" selected hidden>
              Tipo doc.
            </option>
            <option value="Cédula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="tarjeta de identidad">Tarjeta de identidad</option>
          </select>
          <label className="floating-label" htmlFor="type_document">
            Tipo doc.
          </label>
          <i></i>
        </div>
        <div className="input-container">
          <input
            type="search"
            id="num_document"
            {...register('num_document')}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Número de documento"
          />
          <label htmlFor="num_document" className="floating-label">
            Número de documento
          </label>
        </div>
        <div className="input-container">
          <input
            type="search"
            id="num_disbursement"
            {...register('num_disbursement')}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Número de desembolso"
          />
          <label htmlFor="num_disbursement" className="floating-label">
            Número de desembolso
          </label>
        </div>
        <div className="input-container-small">
          <input
            type="date"
            id="date_since"
            {...register('date_since')}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Desde"
          />
          <label htmlFor="date_since" className="floating-label">
            Desde
          </label>
          <FaRegCalendarDays fill="red" size={25} onClick={() => focusDatePicker()}/>
        </div>
        <div className="input-container-small">
          <input
            type="date"
            id="date_until"
            {...register('date_until')}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Hasta"
          />
          <label htmlFor="date_until" className="floating-label">
            Hasta
          </label>
          <FaRegCalendarDays fill="red" size={25} onClick={() => focusDatePicker()}/>
        </div>
      </div>
      <main className="data-container" id="data-table-container">
        <table id="powerfullTable">
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th> Número de desembolso</th>
              <th>Tipo de documento</th>
              <th>Número de documento</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item.date_hour}</td>
                <td>{item.disbursement_number}</td>
                <td>{item.document_type}</td>
                <td>{item.document_number}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}
