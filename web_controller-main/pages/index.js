import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Board from '../components/board';
import {db} from '../config/firebase';
import {setDoc, doc} from "firebase/firestore";


const govee_key = "a1cc86f4-4677-42c6-b2c9-5d405d8997a5";

export const handleClickOn = (e) => {


  if (!e.target.checked) {
    const lampRef = doc(db, 'switches', e.target.value);
    setDoc(lampRef, {State: "off"}, {merge: true});

    handleClickOff();
  }



  console.log(e.target.value);
  const lampRef = doc(db, 'switches', e.target.value);
  setDoc(lampRef, {State: "on"}, {merge: true});

  const headers = {
    "content-type": "application/json",
    "Govee-API-Key": govee_key,
  };
  const payload = {
    device: "e1:66:34:20:03:6d:62:62",
    model: "H5081",
    cmd: {
      name: "turn",
      value: "on",
    },
  };
  axios
    .put("https://developer-api.govee.com/v1/devices/control", payload, {
      headers,
    })
    .then((response) => console.log(response.data));
  // change a univerasl state that python script can acsess to tell it the curr state of lamp
  console.log("ON");
};

const handleClickOff = () => {
  const headers = {
    "content-type": "application/json",
    "Govee-API-Key": govee_key,
  };
  const payload = {
    device: "e1:66:34:20:03:6d:62:62",
    model: "H5081",
    cmd: {
      name: "turn",
      value: "off",
    },
  };
  axios
    .put("https://developer-api.govee.com/v1/devices/control", payload, {
      headers,
    })
    .then((response) => console.log(response.data));
  // change a univerasl state that python script can acsess to tell it the curr state of lamp
  console.log("OFF");
};

const handleClickOffForNight = () => {
  const headers = {
    "content-type": "application/json",
    "Govee-API-Key": govee_key,
  };
  const payload = {
    device: "e1:66:34:20:03:6d:62:62",
    model: "H5081",
    cmd: {
      name: "turn",
      value: "off",
    },
  };
  axios
    .put("https://developer-api.govee.com/v1/devices/control", payload, {
      headers,
    })
    .then((response) => console.log(response.data));
  // change a univerasl state that python script can acsess to tell it the curr state of lamp
  let lamp = Lamp.findOneAndUpdate(
    { _id: "63c7136e3852c1d06c488f96" },
    { $set: { state: 1 } }
  );

  console.log("OFF FOR NIGHT");
};

export default function Home() {
  const [lastPong, setLastPong] = useState(null);

  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal">Power Down</h1>
          <p className="lead fw-normal">
            Join the hundreds who have saved a collective 50 grams of carbons
          </p>
          <a className="btn btn-outline-secondary" href="/signup">
            Sign Up
          </a>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
      <Board></Board>
      <div className={styles.container}>
        <Head>
          <title>Lamp Control!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <main>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Lamp Control!</a>
          </h1>

          <div className={styles.grid}>
            <div onClick={handleClickOn} className={styles.card}>
              <h3>ON &rarr;</h3>
            </div>

            <div onClick={handleClickOff} className={styles.card}>
              <h3>OFF &rarr;</h3>
            </div>

            <div onClick={handleClickOffForNight} className={styles.card}>
              <h3>Turn off for night &rarr;</h3>
              <p>Light will be turned off from now until 7am</p>
            </div>
          </div>
        </main> */}

        <footer>
          <a>Powered by Saketh</a>
        </footer>

        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
}
