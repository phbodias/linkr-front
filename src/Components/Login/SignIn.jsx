import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Container, Input, Button, StyledLink } from "./AuthStyle";
import LogoComponent from "./LogoComponent";
import UrlContext from "../../contexts/UrlContext";

export default function SignIn() {
  const URL = useContext(UrlContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  if (localStorage.getItem("tokenLinker")) navigate("/timeline");

  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const promise = axios.post(`${URL}/signin`, data);

    promise
      .then((res) => {
        localStorage.setItem("tokenLinker", res.data.token);
        navigate("/timeline");
      })

      .catch((error) => {
        alert(
          `Erro ao logar: \n\n${error.response.status} - ${error.response.data}`
        );
        setLoading(false);
      });
  }

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <LogoComponent />
      <Container>
        <form onSubmit={handleRegister}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Button type="submit">
            {loading ? (
              <ThreeDots color="#FFF" height={50} width={100} />
            ) : (
              <p>Log In</p>
            )}
          </Button>
        </form>
        <StyledLink to="/signup">First time? Create an account!</StyledLink>
      </Container>
    </>
  );
}
