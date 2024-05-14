import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const LoginA = ({ title }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    console.log(docRef);
  };

  return (
    <div className="new">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="formInput">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={handleInput}
          />
        </div>
        <div className="formInput">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={handleInput}
          />
        </div>
        <div className="formInput">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default LoginA;