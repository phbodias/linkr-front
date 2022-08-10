import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Container, Input, Button, StyledLink } from "./AuthStyle";
import LogoComponent from "./LogoComponent";

export default function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    profilePic: "",
  });

  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const promise = axios.post("https://backlinkr.herokuapp.com/sign-up", data);

    promise
      .then((res) => {
        navigate("/signin");
      })

      .catch((error) => {
        alert(
          `Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data}`
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
            placeholder="email"
            value={data.email}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Input
            type="text"
            name="name"
            placeholder="username"
            value={data.name}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Input
            type="url"
            name="profilePic"
            placeholder="picture url"
            value={data.profilePic}
            onChange={handleInputChange}
            desabilitado={loading}
          />
          <Button type="submit">
            {loading ? (
              <ThreeDots color="#FFF" height={50} width={100} />
            ) : (
              <p>Sign Up</p>
            )}
          </Button>
        </form>
        <StyledLink to="/signin">Switch back to log in</StyledLink>
      </Container>
    </>
  );
}
