import React from "react";
import img from "../../../assets/vertical-market-software.webp";

function MainSection() {
  return (
    <>
      <div className="mt-4">
        <h2>Bienvenido a IT ACADEMY</h2>
        <hr />
        <section className="prinSetion">
          <aside>
            <p>
              Nos complace ofrecer una amplia gama de{" "}
              <b>servicios de informática</b>
              diseñados para satisfacer sus necesidades profesionales, sin
              importar su nivel de experiencia. En nuestra institución,
              encontrará un equipo dedicado de profesionales expertos
              apasionados por la servirle y listos para ayudarlo a tener éxito.
            </p>
            <p>
              Nuestra misión es brindarle las habilidades y conocimientos que
              necesita para tener éxito en la era digital actual. Creemos que
              todos deberían tener acceso a una educación de calidad, por eso
              nos esforzamos por brindar opciones de aprendizaje asequibles y
              flexibles. Nuestros cursos están diseñados para ser prácticos y
              prácticos, brindándole la oportunidad de aplicar lo que aprende en
              entornos del mundo real.
            </p>
            <p>
              <b>Únase a nosotros </b> y emprenda un viaje de crecimiento y
              éxito con nosotros.
            </p>
            <h1>Formando Grandes Profesionales</h1>
          </aside>
          <aside>
            <img src={img} alt="" />
          </aside>
        </section>
      </div>
    </>
  );
}

export default MainSection;
