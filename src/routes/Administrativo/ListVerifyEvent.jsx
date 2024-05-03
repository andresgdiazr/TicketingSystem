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

export default function ListVerifyEvent({ title }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const url = `${hostServer}/api/v2/verifyEvents`;
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPage, setItemsPage] = useState(8);
  const [evento, setEvento] = useState(8);
  const [totalEvent, setTotalEvent] = useState([]);
  const [academys, setAcademys] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [items, setItems] = useState([]);
  const [totalTicket, setTotalTicket] = useState(0);
  const [totalPagado, setTotalPagado] = useState(0);
  const [totalticketEvent, setTotalticketEvent] = useState(0);
  AccessProfil();
  let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
  const filters = [{ id: 1, nombre: "comprador", descrip: "Comprador" }];

  async function handleEdit(entrada) {
    const modalNivel = 2;
    const tittle = "Verificación de Entradas";
    const ticket = await getVerifyTicket(entrada);
    getEntradas();
    openModal(
      <VerifyPendiente
        entrada={ticket?.data?.data}
        edit={true}
        riviewList={""}
      />,
      null,
      "medio",
      tittle,
      modalNivel
    );
  }

  const nextPage = (pagItems, pageCurrent) => {
    setItemsPage(pagItems);
    setPage(pageCurrent);
  };

  const handlePageChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handdleEvent = (e) => {
    setEvento(e.target.value);
  };

  const getEntradas = async () => {
    const url = `${hostServer}/api/v2/verifyEvents`;
    const result = await getData(url);
    setTotalEvent(result?.data.data);
  };

  const getInitData = async () => {
    let url = `${hostServer}/api/v2/academys`;
    let result = await getData(url);
    if (result) {
      setAcademys(result.data.data);
    }
    url = `${hostServer}/api/v2/events`;
    result = await getData(url);
    if (result) {
      setEventos(result.data.data);
      setEvento(result.data.data[0].descripcion);
    }
  };

  const getVerifyTicket = async (ticket) => {
    let url = `${hostServer}/api/v2/ticketVenta/${ticket}`;
    return await getData(url);
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
    setTotalTicket(totalTicket);
    setTotalPagado(totalPagado);
    setTotalticketEvent(totalticketEvent);
  }, [evento]);

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
            <div className="marco">
              <h1 className="my-3">Verificación por Eventos</h1>
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
                        <option key={evento.id} value={evento.descripcion}>
                          {evento.descripcion}
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
                      <th scope="col">Evento</th>
                      <th scope="col">Ticket</th>
                      <th scope="col">Comprador</th>
                      <th scope="col">Monto Tickets</th>
                      <th scope="col">Monto Pagado</th>
                      <th scope="col" colSpan={1}>
                        Acción
                      </th>
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
                        if (item.solvencia === 1) {
                          return (
                            <tr key={item.id}>
                              <td>{item.event}</td>
                              <td align="center">{item.ticket}</td>
                              <td>{item.comprador}</td>
                              <td align="right">{item.montoTicket} </td>
                              <td align="right">{item.montoPagado}</td>
                              <td align="center">
                                <TiEyeOutline
                                  style={{ fontSize: "25px" }}
                                  onClick={() => handleEdit(item.ticket)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })
                    )}
                  </tbody>
                  <tfoot>
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
                  </tfoot>
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
            </div>
          </>
        )
      )}
    </>
  );
}
