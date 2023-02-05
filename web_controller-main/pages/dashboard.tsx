import React, { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import { handleClickOn, handleClickOffForNight } from './index.js';
import { db } from '../config/firebase.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { doc, getDoc, collection, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from '../context/AuthContext'



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

    ],
};


const Dashboard = () => {

    const { user, logout } = useAuth()

    const [loading, setloading] = useState(true);
    const [switches, setSwitches] = useState();
    const [userRef, setUserRef] = useState(null);

    useEffect(() => {
        const getSwitches = [];
        async function pleaseWork() {
            const betterName = doc(db, "users", user.email);
            const docSnap = await getDoc(betterName);

            setUserRef(docSnap.data());
        }
        pleaseWork().then(() => {
            setloading(false)
        });
    }, []);


    const Row = (props) => {
        const [switchesRef, setSwitchesRef] = useState();
        console.log(props.id);
        // model={plug["Model"]} name={plug["Name"]} state={plug["State"]}

        useEffect(() => {
            async function fetchSwitches() {
                const switchDocRef = doc(db, "switches", props.id);
                const docSnap = await getDoc(switchDocRef);
                setSwitchesRef(docSnap.data());
            }
            fetchSwitches();
        }, [])

        if (!switchesRef) {
            return <div>loading....</div>;
        }

        return (
            <>
                <th scope="row">{switchesRef["lamp_ref_id"]}</th>
                <td>{switchesRef["Model"]}</td>
                <td>
                    <Form>
                        <Form.Check
                            onChange={handleClickOn}
                            value={switchesRef["lamp_ref_id"]}
                            type="switch"
                            id="custom-switch"
                            label="Check this switch"
                            defaultChecked={switchesRef["State"] == "on"}
                        />
                    </Form>
                </td>
                <td>

                    <div className="form-group">
                        <input type="range" className="form-control-range" id="formControlRange" />
                    </div>

                </td>
                <td>

                    <button onClick={handleClickOffForNight} className='btn btn-outline-dark'>
                        GoodNight
                    </button>
                </td>
            </>


        )

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container py-4">
            <div className="container py-5">
                <Bar options={options} data={data} />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Model</th>
                        <th scope="col">Status</th>
                        <th scope="col">Distance</th>
                        <th scope="col">Turn off for tonight</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userRef["Plugs"][0] && (
                            <>
                                {
                                    userRef["Plugs"].map((plug, index) => {


                                        return (
                                            <tr>
                                                <Row key={index} id={plug.id}>

                                                </Row>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        )
                    }


                </tbody>
            </table>
        </div>

    )
}

export default Dashboard