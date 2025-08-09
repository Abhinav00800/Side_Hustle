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
        labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
        datasets: [
            {
                label: "Business Growth Rate (%)",
                backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderColor: "#4f46e5",
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: "#4f46e5",
                hoverBorderColor: "#3730a3",
                data: [45, 62, 78, 85],
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
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 14,
                        weight: '500'
                    },
                    color: '#374151'
                }
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#f9fafb',
                bodyColor: '#f9fafb',
                borderColor: '#4f46e5',
                borderWidth: 1,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    color: '#6b7280'
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f3f4f6',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    color: '#6b7280',
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
        },
    };

    const heroStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 0',
        marginBottom: '80px'
    };

    const sectionStyle = {
        padding: '60px 0'
    };

    const primaryButtonStyle = {
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        border: 'none',
        borderRadius: '50px',
        padding: '15px 35px',
        fontWeight: '600',
        fontSize: '16px',
        boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const secondaryButtonStyle = {
        background: 'transparent',
        border: '2px solid #4f46e5',
        color: '#4f46e5',
        borderRadius: '50px',
        padding: '15px 35px',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const exploreButtonStyle = {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        border: 'none',
        borderRadius: '50px',
        padding: '15px 35px',
        fontWeight: '600',
        fontSize: '16px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const statsCardStyle = {
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: 'none',
        padding: '40px 30px',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc' }}>
            <Navbar />
            
            {/* Hero Section */}
            <div style={heroStyle}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <h1 style={{ 
                                fontSize: '3.5rem', 
                                fontWeight: '800', 
                                marginBottom: '24px',
                                lineHeight: '1.1'
                            }}>
                                Transform Your
                                <span style={{ 
                                    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'block'
                                }}>
                                    Side Hustle
                                </span>
                                Into Success
                            </h1>
                            <p style={{ 
                                fontSize: '1.25rem', 
                                opacity: '0.9', 
                                marginBottom: '40px',
                                lineHeight: '1.6'
                            }}>
                                Empowering entrepreneurs and small businesses with cutting-edge tools, 
                                strategic insights, and community-driven growth solutions.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-3">
                                {!localStorage.getItem('authToken') ? (
                                    <>
                                        <Button 
                                            style={primaryButtonStyle}
                                            onClick={() => navigate('/login')}
                                            onMouseOver={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 15px 35px rgba(79, 70, 229, 0.4)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.3)';
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                        <Button 
                                            style={secondaryButtonStyle}
                                            onClick={() => navigate('/signup')}
                                            onMouseOver={(e) => {
                                                e.target.style.background = '#4f46e5';
                                                e.target.style.color = 'white';
                                                e.target.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = '#4f46e5';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            Join Community
                                        </Button>
                                    </>
                                ) : (
                                    <Button 
                                        style={exploreButtonStyle}
                                        onClick={() => navigate('/home')}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                                        }}
                                    >
                                        Explore Dashboard
                                    </Button>
                                )}
                            </div>
                        </Col>
                        <Col lg={6} className="text-center">
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                padding: '40px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '700' }}>
                                    Join Our Platform Now
                                </h3>
                                <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                                    Already transforming their business ideas into profitable ventures
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <Container style={sectionStyle}>
                <Row className="text-center mb-5">
                    <Col>
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: '700', 
                            color: '#1f2937',
                            marginBottom: '20px'
                        }}>
                            Why Choose SideHustle?
                        </h2>
                        <p style={{ 
                            fontSize: '1.1rem', 
                            color: '#6b7280',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Comprehensive solutions designed to accelerate your business growth 
                            and maximize your entrepreneurial potential.
                        </p>
                    </Col>
                </Row>
                
                <Landingcards />
            </Container>

            {/* Statistics Section */}
            <div style={{ background: '#ffffff', ...sectionStyle }}>
                <Container>
                    <Row>
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <Card style={statsCardStyle}>
                                <h2 style={{ 
                                    fontSize: '2.2rem', 
                                    fontWeight: '700', 
                                    color: '#1f2937',
                                    marginBottom: '20px'
                                }}>
                                    Performance Analytics
                                </h2>
                                <p style={{ 
                                    fontSize: '1.1rem', 
                                    color: '#6b7280',
                                    marginBottom: '30px',
                                    lineHeight: '1.6'
                                }}>
                                    Track your business growth with real-time analytics and 
                                    data-driven insights that help you make informed decisions.
                                </p>
                                <div style={{ height: "350px" }}>
                                    <Bar 
                                        key={`bar-chart-${Date.now()}`} 
                                        data={barData} 
                                        options={barOptions} 
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Row className="h-100">
                                <Col xs={12} className="mb-4">
                                    <Card style={{
                                        ...statsCardStyle,
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                        color: 'white'
                                    }}>
                                        <h3 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
                                            85%
                                        </h3>
                                        <p style={{ fontSize: '1.1rem', opacity: '0.9', margin: 0 }}>
                                            Average Growth Rate
                                        </p>
                                    </Card>
                                </Col>
                                <Col xs={12}>
                                    <Card style={{
                                        ...statsCardStyle,
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        color: 'white'
                                    }}>
                                        <h3 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
                                            24/7
                                        </h3>
                                        <p style={{ fontSize: '1.1rem', opacity: '0.9', margin: 0 }}>
                                            Business Support
                                        </p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Call to Action Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                color: 'white',
                padding: '80px 0'
            }}>
                <Container className="text-center">
                    <h2 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: '700', 
                        marginBottom: '20px'
                    }}>
                        Ready to Scale Your Business?
                    </h2>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        opacity: '0.9', 
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        Join thousands of successful entrepreneurs who have transformed 
                        their side hustles into thriving businesses.
                    </p>
                    <Button 
                        style={{
                            ...primaryButtonStyle,
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            color: '#1f2937',
                            fontSize: '18px',
                            padding: '18px 40px'
                        }}
                        onClick={() => navigate(localStorage.getItem('authToken') ? '/home' : '/signup')}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 15px 35px rgba(251, 191, 36, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 25px rgba(251, 191, 36, 0.3)';
                        }}
                    >
                        Start Your Journey Today
                    </Button>
                </Container>
            </div>

            <Fotter />
        </div>
    );
};

export default Landing;