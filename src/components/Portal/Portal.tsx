// import { useEffect } from "react";
// import { createPortal } from "react-dom";

// const Portal = ({ children }: any) => {
//   const mount: any = document.getElementById("portal-root");
//   const el = document.createElement("div");

//   useEffect(() => {
//     mount.appendChild(el);
//     return () => mount.removeChild(el);
//   }, [el, mount]);

//   return createPortal(children, el);
// };

// export default Portal;

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type PortalProps = { id?: string; children?: React.ReactNode };

const Portal = ({ id = "modal-root", children }: PortalProps) => {
  const modalRootRef = useRef<HTMLElement | null>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    modalRootRef.current = document.getElementById(id);

    if (!modalRootRef.current) {
      modalRootRef.current = document.createElement("div");

      modalRootRef.current.setAttribute("id", id);
      document.body.appendChild(modalRootRef.current);
    }

    setMounted(true);
  }, [id]);

  return isMounted && modalRootRef.current ? createPortal(children, modalRootRef.current) : null;
};

export default Portal;
