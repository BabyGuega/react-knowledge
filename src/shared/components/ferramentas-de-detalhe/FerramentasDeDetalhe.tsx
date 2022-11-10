import { Box, Button, Divider, Icon, Paper , Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?:string 

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEFecharCarregando?: boolean

    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEFechar?: () => void
}
export const FerramentasDeDetalhe : React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar= true,
    mostrarBotaoApagar=true,
    mostrarBotaoSalvar=true,
    mostrarBotaoSalvarEFechar=false,

    mostrarBotaoNovoCarregando= false,
    mostrarBotaoVoltarCarregando= false,
    mostrarBotaoApagarCarregando= false,
    mostrarBotaoSalvarCarregando= false,
    mostrarBotaoSalvarEFecharCarregando= false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar
}) => {
   
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
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
        {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) &&(
        <Button
        variant='contained'
        disableElevation
        onClick={aoClicarEmSalvar} 
        color="primary"
        startIcon={<Icon>save</Icon>}
        >
            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
            </Typography>
            </Button>  
        )}
        
        {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60}/>)}
         
        {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown)&&(
            <Button
            variant='outlined'
            disableElevation
            onClick={aoClicarEmSalvarEFechar} 
            color="primary"
            endIcon={<Icon>arrow_back</Icon>}
            startIcon={<Icon>save</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" >
                Salvar e fechar
            </Typography>
            </Button>
        )}
        {(mostrarBotaoSalvarCarregando && !smDown && !mdDown) && 
        (<Skeleton width={110} height={60}/> )} 
        
        {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando && !smDown) &&(   
            <Button
            variant='outlined'
            disableElevation
            onClick={aoClicarEmApagar} 
            color="primary"
            startIcon={<Icon>delete</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                Apagar
                </Typography>
                </Button>
        )}
        {mostrarBotaoApagarCarregando && (<Skeleton width={180} height={60}/> )}
        
        {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
            <Button
            variant='outlined'
            disableElevation
            onClick={aoClicarEmNovo} 
            color= "primary"
            startIcon={<Icon>add</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                {textoBotaoNovo}
                </Typography>
                </Button>

        )}
        
        {(mostrarBotaoNovoCarregando && !smDown) && 
        (<Skeleton width={110} height={60}/> )}

{
    (
        mostrarBotaoVoltar && 
        (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
    ) && (
        <Divider variant="middle" orientation="vertical" />
    )
}
        
        
        {(mostrarBotaoVoltar&& !mostrarBotaoVoltarCarregando) &&(
            <Button
            variant='outlined'
            disableElevation
            onClick={aoClicarEmVoltar} 
            color= "primary"
            startIcon={<Icon>arrow_back</Icon>}
            >
                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                Voltar</Typography>
                </Button>)}

            {mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60}/> )}
        
        </Box>
    )
}