import React, { useState, useEffect } from "react";
import "../_assets/signup.css";
import "../_assets/App.css";
import { useDispatch } from "react-redux";
import userSlice from "../redux/user.slice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [buttonGrey, setButtonGrey] = useState("#cccccc");

  useEffect(() => {
    if (name !== "") {
      setButtonGrey("black");
    } else {
      setButtonGrey("#cccccc");
    }
  }, [name]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(userSlice.actions.saveUser(name));
    navigate("/main");
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  return (
    <div className="container">
      <div className="LoginBox">
        <form onSubmit={handleSubmitForm}>
          <h2>Welcome to codeleap network</h2>
          <text>Please enter your username</text>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            placeholder="Jane Doe"
          />
          <div className="button">
            <button
              type="submit"
              style={{ backgroundColor: buttonGrey }}
              disabled={!name}
            >
              ENTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
