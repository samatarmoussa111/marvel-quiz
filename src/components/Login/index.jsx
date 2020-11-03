import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Login = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [password, email]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  const Button = btn ? (
    <button>Connexion</button>
  ) : (
    <button disabled="disabled">Connexion</button>
  );

  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  required
                  autoComplete="off"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  required
                  autoComplete="off"
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {Button}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié? Récupérer-le ici
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
