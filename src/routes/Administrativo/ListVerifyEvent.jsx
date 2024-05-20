import React, { useEffect, useRef } from "react";
import openModal from "../../componets/modal/OpenModal";
import Pagination from "../../componets/services/Pagination";
import AccessProfil from "../../componets/services/AccessProfil";
import Buscador from "../../componets/Buscador";
import VerifyPendiente from "../Administrativo/VerifyPendiente";
import Swal from "sweetalert2";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { TiEyeOutline } from "react-icons/ti";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ListVerifyEvent({ title }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const url = `${hostServer}/api/v2/verifyEvents`;
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPage, setItemsPage] = useState(8);
  const [evento, setEvento] = useState(8);
  const [type, setType] = useState(8);
  const [totalEvent, setTotalEvent] = useState([]);
  // const [academys, setAcademys] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [types, setTypes] = useState([]);
  const [items, setItems] = useState([]);
  const [numEvents,setNumEvents] = useState([]);
  const [numEvent,setNumEvent] = useState([]);
  let { dataSelected, getDataSelected }= useFetch(null);
  // const [totalTicket, setTotalTicket] = useState(0);
  // const [totalPagado, setTotalPagado] = useState(0);
  // const [totalticketEvent, setTotalticketEvent] = useState(0);
  AccessProfil();

  let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
  const filters = [{ id: 1, nombre: "comprador", descrip: "Comprador" }];

  // async function handleEdit(entrada) {
  //   const modalNivel = 2;
  //   const tittle = "Verificación de Entradas";
  //   const registers = await getRegisters(entrada);
  //   getEntradas();
  //   openModal(
  //     <VerifyPendiente
  //       entrada={registers?.data?.data}
  //       edit={true}
  //       riviewList={""}
  //     />,
  //     null,
  //     "medio",
  //     tittle,
  //     modalNivel
  //   );
  // }

  const nextPage = (pagItems, pageCurrent) => {
    setItemsPage(pagItems);
    setPage(pageCurrent);
  };

  const handlePageChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handdleEvent = async (e) => {
    
    setEvento(e.target.value);
    console.log(e.target.value)
    const url = `${hostServer}/api/v2/registers`;
    const result = await getDataSelected(url,numEvent);
   // console.log(result);
    const result2 = result.data.data;
    const result3 = result2.filter((item) => item.eventCodigo == e.target.value);
    
    setSelectedItems(result3);

    
    
  };

  const handdleType = (e) => {
    setType(e.target.value);
  };

  const getEntradas = async () => {
    // se consultan los registros
   /* console.log("Hola");
    const url = `${hostServer}/api/v2/registers`;
    const result = await getDataSelected(url,1);
    console.log(result)
    // setTotalEvent(result?.data.data);
    setSelectedItems(result.data.data);*/
  };

  const getInitData = async () => {
    // let url = `${hostServer}/api/v2/academys`;
    // let result = await getData(url);
    // if (result) {
    //   setAcademys(result.data.data);
    // }
    let url = `${hostServer}/api/v2/events`;
    let result = await getData(url);
    if (result) {
      setEventos(result.data.data);
      setEvento(result.data.data[0].descripcion);
    }
    setTypes([
      'Asistencia',
      'Tipo de incidencia'
    ]);
  };

  // const getRegisters = async (ticket) => {
  //   let url = `${hostServer}/api/v2/ticketVenta/${ticket}`;
  //   return await getData(url);
  // };

  const exportToExcel = () => {
    const data = [
      {
        "tipoRegistro": "Asistencia",
        "nombreEvento": "Competencia de HipHop"
      },
      {
        "tipoRegistro": "Tipo de incidencia",
        "nombreEvento": "Competencia de HipHop"
      },
      {
        "tipoRegistro": "Asistencia",
        "nombreEvento": "Competencia de HipHop"
      },
      {
        "tipoRegistro": "Tipo de incidencia",
        "nombreEvento": "Competencia de HipHop"
      },
    ];

    // usar el array de registros en vez de json de prueba

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    // Generar el archivo Excel y descargarlo
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const download = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(download, 'Reporte.xlsx');

  };

  useEffect(() => {
    let totalTicket = 0;
    let totalPagado = 0;
    let totalticketEvent = 0;
    let result = totalEvent.filter((eventIten) => {
      return eventIten.event == evento;
    });
    setItems(result);
    result.map((item) => {
      totalTicket = totalTicket + item.montoTicket;
      if (item.montoTicket - item.montoPagado > 0) {
        totalPagado = totalPagado + item.montoPagado;
      }
      totalticketEvent = totalticketEvent + 1;
    });
    // setTotalTicket(totalTicket);
    // setTotalPagado(totalPagado);
    // setTotalticketEvent(totalticketEvent);
  }, [evento]);

  useEffect(() => {

  }, [type]);

  useEffect(() => {
    getEntradas();
    getInitData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h3 className="mt-5 text-center">Cargando...</h3>
      ) : (
        selectedItems && (
          <>
            <div className="marco px-5">
              <h1 className="my-3 text-2xl font-bold text-gray-800">Descarga de Reportes</h1>
              <hr className="mb-4 text-blue-500"/>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <label htmlFor="evento">Seleccione Evento</label>
                  <select
                    className="form-control"
                    name="evento"
                    value={evento}
                    onChange={handdleEvent}
                  >
                    <option></option>
                    {eventos.map((evento) => {
                      return (
                        <option key={evento.id} value={evento.codigo} label={evento.descripcion}>
                          {evento.descripcion}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <label htmlFor="evento">Seleccione tipo de reporte</label>
                  <select
                    className="form-control"
                    name="type"
                    value={type}
                    onChange={handdleType}
                  >
                    <option></option>
                    {types.map((t) => {
                      return (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="tittle-search">
                <div className="search">
                  <Buscador
                    filters={filters}
                    registros={items}
                    onPageChange={handlePageChange}
                  />
                </div>
                {/* <button className="addBtn" onClick={handleAddEntradas}>
                  <IoMdAdd />
                </button> */}
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Tipos de Registros</th>
                      <th scope="col">Evento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.status === 500 ? (
                      <tr>
                        <td scope="col" colSpan={12}>
                          <h3 className="textCenter">
                            No hay información para esta Entidad.
                          </h3>
                        </td>
                      </tr>
                    ) : (
                      selectedItems.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.tipo}</td>
                              <td>{item.eventCodigo}</td>
                            </tr>
                          );

                      })
                    )}
                  </tbody>
                  {/* <tfoot>
                    <tr>
                      <td scope="col" colSpan={1}>
                        <strong className="m-1">
                          <em>Entradas .:</em>
                        </strong>{" "}
                        <b>
                          <em>
                            <span>{totalticketEvent}</span>
                          </em>
                        </b>
                      </td>
                      <td scope="col" colSpan={2} align="left">
                        <strong className="m-1">
                          <em>Total Costo : </em>
                        </strong>{" "}
                        <b>
                          <em>{totalTicket}</em>
                        </b>
                      </td>
                      <td scope="col" colSpan={3} align="left">
                        <strong className="m-1">
                          <em>Total pago .: </em>
                        </strong>{" "}
                        <b>
                          <em>{totalPagado}</em>
                        </b>
                      </td>
                    </tr>
                  </tfoot> */}
                </table>
              </div>

              {data?.data?.data && (
                <Pagination
                  items={items}
                  page={page}
                  pagItems={itemsPage}
                  nextPage={nextPage}
                  onPageChange={handlePageChange}
                />
              )}
              <div className="w-full flex justify-end mt-4">
                <button className="bg-blue-500 text-white font-semibold p-2 rounded" onClick={exportToExcel}>Descargar Reporte</button>
              </div>
            </div>
            
          </>
        )
      )}
    </>
  );
}
