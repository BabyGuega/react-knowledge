import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDePessoas, DetalheDePessoas } from "../pages";
import { DetalheDeCidades } from "../pages/cidades/DetalheDeCidades";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Pessoas",
        icon: "people",
        path: "/pessoas",
      },
      {
        label: "Cidade",
        icon: "location_city",
        path: "/cidades",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />

      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />
      <Route path="/cidades" element={<ListagemDeCidades />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

//<Route path="*" element= {<Navigate to ='/pagina-inicial'/>} />
// useEffect usa uma vez so pra simplificar o codigo
