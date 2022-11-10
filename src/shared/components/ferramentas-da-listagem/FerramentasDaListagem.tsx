import { Box, Button, Icon, IconButton, Paper, TextField, useTheme} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';

import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string
    mostrarInputDaBusca?: boolean
    aoMudarTextoDeBusca?: (novoTexto: string) => void
    textoBotaoNovo?: string
    mostrarBotaoNovo?: boolean
    aoClicarEmNovo?: () => void
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = (
    {textoDaBusca =''
    , mostrarInputDaBusca = false
    , aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    aoClicarEmNovo}) => {
    const theme= useTheme()

    return(
        <Box 
        height={theme.spacing(5)} 
        marginX={1} 
        padding={1} 
        paddingX={2} 
        display="flex" 
        alignItems="center" 
        gap={1} 
        component={Paper}>
            <IconButton><SearchIcon/></IconButton>
            {mostrarInputDaBusca && (
                <TextField
                value={textoDaBusca} 
                onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                size="small"
                placeholder={Environment.INPUT_DE_BUSCA}
                />
            )}
        <Box flex={1} display="flex" justifyContent="end">
           {mostrarBotaoNovo &&(
             <Button
             variant='contained'
             disableElevation 
             color="primary"
             onClick= {aoClicarEmNovo}
             endIcon={<Icon>add</Icon>}
             
             >{textoBotaoNovo}</Button>
           )}
            </Box>
        </Box>

    )
}