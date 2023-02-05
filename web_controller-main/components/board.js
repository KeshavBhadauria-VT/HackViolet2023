import React, { useEffect, useState } from "react";
import Profiles from "./profiles";
import { Leaderboard } from "./database";
import { db } from "../config/firebase";
import { Container, Cotainer } from "react-bootstrap";
import { getDocs, collection, Firestore } from "firebase/firestore";

export default function Board() {
  const [loading, setloading] = useState(true);
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = [];
    async function pleaseWork() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        getUsers.push(doc.data());
      });

      setUsers(getUsers);
      setloading(false);
    }
    pleaseWork();    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      <h1 className="leaderboard">Users!</h1>
      {users && (
      <Container>
        <Profiles Leaderboard={users}></Profiles>
      </Container>
      )
    }
    </div>
  );
}

async function between(data) {
  // const today = new Date();
  // const previous = new Date(today);
  // previous.setDate(previous.getDate() - (between + 1));

  // let filter = data.filter(val => {
  //     let userDate = new Date(val.dt);
  //     if (between == 0) return val;
  //     return previous <= userDate && today >= userDate;
  // })

  // sort with asending order
  
}
