import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Paginate() {
  const [users, setusers] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const SIZE = 5;
  const getAllUsers = async (e) => {
    const result = await axios.get(
      ` http://localhost:5000/users?_limit=${SIZE}&_page=${page}`
    );

    console.log(result);
    const x = result.headers["x-total-count"];
    settotal(Math.ceil(x / SIZE));
    setusers(result.data);
  };
  useEffect(() => {
    getAllUsers();
  }, [page]);
  return (
    <>
      <select>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
      </select>

      {users.map((item) => (
        <div key={item.name} class="card mb-3" style={{ maxWidth: "540px" }}>
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={item.avatar}
                class="img-fluid  rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1 class="card-text">{item.name}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h1>{page}</h1>
      {[...Array(total).keys()].map((item, index) => (
        <button onClick={(e) => setpage(index + 1)}>{index + 1}</button>
      ))}
    </>
  );
}
