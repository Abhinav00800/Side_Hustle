import React from "react";
import pic1 from "../Images/image1.jpg";
import pic2 from "../Images/image2.jpg";
import pic3 from "../Images/OnDemandpic.jpg";

function Testimonial() {
  return (
    <div style={styles.container}>
      <section>
        <div style={styles.innerContainer}>
          <h1 style={styles.title}>Testimonial</h1>
          <h2 style={styles.subtitle}>
            What our <span style={styles.highlight}>customers</span> are saying
          </h2>
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
    padding: "10px",
  },
  innerContainer: {
    maxWidth: "800px",
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
    marginBottom: "20px",
  },
  highlight: {
    color: "#D53F8C", // pink color
  },
  testimonialWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "-10px",
  },
  testimonialCard: {
    flex: "1 1 30%",
    margin: "10px",
    padding: "20px",
    textAlign: "center",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "15px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid #E2E8F0",
    background: "#E2E8F0",
  },
  text: {
    lineHeight: "1.5",
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
