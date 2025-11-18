import { useState, useEffect } from "react";
import { vetsMock } from "../data/mocks/vetsMock";
import { getVets } from "../data/api";

export function useVets(useMock = false) {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    try {
      if (useMock) {
        setVets(vetsMock);
      } else {
        const data = await getVets();
        setVets(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message || "Erro ao carregar veterinários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { vets, loading, error, reload };
}
