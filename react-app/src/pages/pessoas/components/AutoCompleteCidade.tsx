import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadeService } from "../../../shared/services/api/cidades/CidadeService";
/* eslint-disable */
type TAutoComplete = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cidadeId");
  const [option, setOption] = useState<TAutoComplete[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );
  const { debounce } = useDebounce();
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);
  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadeService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          //alert(result.message);
        } else {
          console.log(result);

          setOption(
            result.data.map((cidades) => ({
              id: cidades.id,
              label: cidades.nome,
            }))
          );
        }
      });
    });
  }, [busca]);
  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = option.find((option) => option.id === selectedId);

    return selectedOption;
  }, [selectedId, option]);
  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      clearText="Limpar "
      disablePortal
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={24} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setBusca(newValue)}
      options={option}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
        clearError();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
