import Button from "react-bootstrap/Button";

export default function ErrorContent(props) {
  const reload = () => window.location.reload();

  return (
    <div {...props}>
      <p className="mb-3 mt-3 text-center">
        Esto sucede porque ha ocurrido un error internamente dentro de la
        plataforma. <br />
        Puedes hacer lo siguiente si el problema persiste:
      </p>
    
      <ul className="list-unstyled text-center">
        <li className="mb-1">&#8226; Nuestro correo de contacto</li>
        <li className="mb-1">&#8226; Nuestra página de soporte</li>
        <li>&#8226; Recargar o eliminar el cache del navegador</li>
      </ul>

      <div className="d-flex mt-3 justify-content-center">
        <Button variant="success" className="mr-2" size="sm" onClick={reload}>
          Recargar página
        </Button>
        <Button variant="danger" size="sm">
          Reportar un problema
        </Button>
      </div>
    </div>
  );
}
