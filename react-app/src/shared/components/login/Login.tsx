import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };
  if (isAuthenticated) return <>{children}</>;
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection={"column"} gap={2} width={250}>
            <Typography variant="h6" align={"center"}>
              Identifique-se
            </Typography>
            <TextField
              fullWidth
              label="email"
              type="email"
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError("")}
            />
            <TextField
              fullWidth
              label="senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError("e.target.value")}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading} endIcon={isLoading? <CircularProgress variant="indeterminate" color="inherit" size={20}/> : undefined}>
              Login
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
