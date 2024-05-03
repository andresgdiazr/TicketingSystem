import React from "react";
import android from "../../../assets/android_app.jpg";
import graphic from "../../../assets/graphic_desing.jpg";
import basic from "../../../assets/computer_basic.jpg";
import web from "../../../assets/web_app.jpg";
const servicios = [
  {
    id: 1,
    imahen: web,
    title: "Desarrollo WEB",
    descrip:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, assumenda ut",
    time: "11 Meses",
    calification: 4,
  },
  {
    id: 2,
    imahen: graphic,
    title: "Diseño Gráfico",
    descrip:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, assumenda ut Fuga aperiam perferendis in nam, tempore facilis consectetur incidunt",
    time: "6 Meses",
    calification: 4,
  },
  {
    id: 3,
    imahen: basic,
    title: "Computación Básica",
    descrip:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, assumenda ut Fuga aperiam perferendis in nam, tempore facilis consectetur incidunt",
    time: "3 Meses",
    calification: 5,
  },
  {
    id: 4,
    imahen: android,
    title: "Desarrollo de Apps Android",
    descrip:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, assumenda ut Fuga aperiam perferendis in nam, tempore facilis consectetur incidunt. Numquam est porro delectus ea at harum cupiditate temporibus doloribus",
    time: "6 Meses",
    calification: 4,
  },
];
function CardCourse() {
  return (
    <>
      <h2>Cursos destacados</h2>
      <hr />
      <br />
      <br />
      <div className="row ">
        <div className="cards">
          {servicios.map((servicio) => (
            <div className="card h-100 card" key={servicio.id}>
              <img
                src={servicio.imahen}
                className="card-img-top"
                alt={servicio.imahen}
              />
              <div className="card-body">
                <h5 className="card-title">{servicio.title}</h5>
                <p className="card-text">{servicio.descrip}</p>
              </div>
              <div className="card-footer">
                <div className="grup-footer">
                  <small className="text-muted">{`Duración de los cursos ${servicio.time}`}</small>
                  <div>
                    <span>{`Clasificación de ${servicio.calification} Estrellas`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardCourse;
