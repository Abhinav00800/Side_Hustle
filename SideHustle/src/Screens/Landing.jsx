import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import Landingcards from "../components/landingcards"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Landing = () => {
    const navigate = useNavigate();
    const barData = {
        labels: ["Business A", "Business B", "Business C", "Business D"],
        datasets: [
            {
                label: "Businesses Not Scaling Up",
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.8)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: [20, 15, 25, 30],
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Navbar />
            <Container className="text-center my-5">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fw-bold display-4">Welcome to SideHustle</h1>
                        <p className="text-muted lead">
                            Empowering small businesses to grow and thrive in your community.
                        </p>
                    </Col>
                </Row>

                <Row className="mb-4">
                    {
                        !localStorage.getItem('authToken') ?
                            (<Col>
                                <Button variant="primary" onClick={()=> navigate('/login')} size="lg" className="me-3">
                                    Login
                                </Button>
                                <Button variant="success"onClick={()=> navigate('/signup')} size="lg">
                                    Sign Up
                                </Button>
                            </Col>) : (
                                <Col>
                                    <Button size="lg" onClick={() => navigate('/home')} className="btn buttonbg ">
                                        Explore More
                                    </Button>
                                </Col>
                            )
                    }
                </Row>

                <div>
                    <Landingcards />
                </div>

                <Row className="mb-5">
                    <Col>
                        <h2 className="fw-bold mb-4">Impact Statistics</h2>
                        <p className="text-muted">
                            Discover how SideHustle is empowering small businesses in your
                            society:
                        </p>
                        <div style={{ height: "300px" }}>
                            <Bar key={`bar-chart-${Date.now()}`} data={barData} options={barOptions} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Fotter />
        </div>
    );
};

export default Landing;
