import React from 'react'
import { Container, Form } from 'react-bootstrap'

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
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


const Dashboard = () => {


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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Check this switch"
                                />
                            </Form>
                        </td>
                        <td>

                            <div className="form-group">
                                <input type="range" className="form-control-range" id="formControlRange" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td><Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                            />
                        </Form></td>
                        <td>

                            <form>
                                <div className="form-group">
                                    <input type="range" className="form-control-range" id="formControlRange" />
                                </div>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td><Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                            />
                        </Form></td>
                        <td>
                            <div className="form-group">
                                <input type="range" className="form-control-range" id="formControlRange" />
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Dashboard