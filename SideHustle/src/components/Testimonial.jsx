import React from "react";
import pic1 from "../Images/image1.jpg";
import pic2 from "../Images/image2.jpg";
import pic3 from "../Images/OnDemandpic.jpg";

function Testimonial() {
  return (
    <div style={styles.container}>
      <section>
        <div style={styles.innerContainer}>
          <div className='fs-1 m-4 text-center' style={{fontFamily:"Bodoni", fontWeight:"bold", color:" rgb(197, 170, 106)"}}>
          <h1>Testimonial</h1>
          </div>
          <div style={styles.testimonialWrapper}>
            <div style={styles.testimonialCard}>
              <img alt="testimonial" style={styles.image} src={pic1} />
              <p style={styles.text}>
                At the heart of our on-demand business lies a commitment to
                revolutionizing the way you experience service, where intricate
                systems and cutting-edge technology converge to create a
                seamless ecosystem of solutions, meticulously designed to
                anticipate and exceed your expectations.
              </p>
              <span style={styles.separator} />
            </div>

            <div style={styles.testimonialCard}>
              <img alt="testimonial" style={styles.image} src={pic2} />
              <p style={styles.text}>
                Join us on a journey where convenience knows no bounds, where
                our on-demand services are tailored to fit seamlessly into your
                busy lifestyle, providing solutions that not only save you time
                and effort but also enhance your overall well-being.
              </p>
              <span style={styles.separator} />
            </div>

            <div style={styles.testimonialCard}>
              <img alt="testimonial" style={styles.image} src={pic3} />
              <p style={styles.text}>
                Welcome to a world where your satisfaction is our obsession,
                where every aspect of our on-demand services is designed with
                your needs and preferences in mind, ensuring that every
                interaction leaves you feeling valued and appreciated.
              </p>
              <span style={styles.separator} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  innerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "30px",
  },
  highlight: {
    color: "#D53F8C", // pink color
  },
  testimonialWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px", // Ensures consistent spacing between cards
    flexWrap: "wrap",
  },
  testimonialCard: {
    flex: "1 1 calc(33.333% - 20px)", // Cards take up equal width minus spacing
    maxWidth: "calc(33.333% - 20px)", // Ensures consistent width
    margin: "10px 0",
    padding: "20px",
    textAlign: "center",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  testimonialCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: "150px",
    height: "150px",
    marginBottom: "15px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid #E2E8F0",
    background: "#E2E8F0",
  },
  text: {
    lineHeight: "1.6",
    color: "black",
  },
  separator: {
    display: "block",
    height: "2px",
    width: "50px",
    backgroundColor: "#D53F8C",
    margin: "20px auto",
  },
};

export default Testimonial;
