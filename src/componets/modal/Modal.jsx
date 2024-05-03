import { useRef, useState, useEffect } from "react";
import { AppContextProvider } from "../../hooks/appContext";
import { VscChromeClose } from "react-icons/vsc";
import "./modal.css";

function Modal({
  children,
  title,
  // root,
  modalClose,
  size,
  modalNivel,
  bgChange,
}) {
  const [classe, setClase] = useState("");
  let bgColor = false;
  const ref = useRef(null);
  const modelref = useRef(null);

  if (bgChange && !bgColor) {
    bgColor = true;
  }

  function handleClose() {
    ref.current.classList.add("fadeOut");
    modalClose();
    ref.current.addEventListener("animationend", (e) => {
      const div_root = document.getElementById("modal");
      div_root.remove();
    });
  }

  function HandleNivelClose() {
    modelref.current.classList.add("fadeOut");
    modelref.current.addEventListener("animationend", (e) => {
      const div_root = document.getElementById("modalDos");
      div_root.remove();
    });
  }

  useEffect(() => {
    switch (size) {
      case "small":
        setClase("modalView modalViewSmall");
        break;
      case "medio":
        setClase(
          `modalView modalViewMedio ${
            bgColor ? "modalBodyGrey" : "modalBodyWhite"
          }`
        );
        break;
      case "big":
        setClase("modalView modalViewBig");
        break;
      default:
        setClase("modalView");
        break;
    }
  }, [size]);

  return (
    <AppContextProvider>
      {modalNivel === 1 ? (
        <div className="modalContainer" ref={ref}>
          <div className={classe}>
            <div className="modalHeader">
              <div className="motalTitle">{title}</div>
              <div>
                {
                  // modalNivel === 1 ? (
                  <button className="closeButton" onClick={handleClose}>
                    <VscChromeClose />
                  </button>
                }
              </div>
            </div>
            <div className="modalContent">{children}</div>
          </div>
        </div>
      ) : (
        <div className="modalContainer" ref={modelref}>
          <div className={classe}>
            <div className="modalHeader">
              <div className="motalTitle">{title}</div>
              <div>
                {
                  <button className="closeButton" onClick={HandleNivelClose}>
                    <VscChromeClose />
                  </button>
                }
              </div> 
            </div>
            <div className="modalContent">{children}</div>
          </div>
        </div>
      )}
    </AppContextProvider>
  );
}

export default Modal;
