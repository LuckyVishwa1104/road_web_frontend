import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";
import img1 from "../images/hole1.jpg";
import img2 from "../images/water1.jpg";
import img3 from "../images/crack1.jpeg";
import img4 from "../images/hole2.jpg";
import img5 from "../images/water2.jpeg";
import img6 from "../images/crack2.jpeg";

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    { src: img1, name: 'Potholes' },
    { src: img2, name: 'Water Logging' },
    { src: img3, name: 'Cracks' },
    { src: img4, name: 'Potholes' },
    { src: img5, name: 'Water Logging' },
    { src: img6, name: 'Cracks' },
  ];

  const handleMouseEnter = (name) => {
    setHoveredService(name);
  };

  const handleMouseLeave = () => {
    setHoveredService(null);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px',
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '10px',
      cursor: 'pointer',
      position: 'relative',
    },
    image: {
      width: '150px',
      height: '150px',
      borderRadius: '8px',
      objectFit: 'cover',
    },
    caption: {
      marginTop: '5px',
      fontSize: '16px',
      visibility: hoveredService ? 'visible' : 'hidden',
      opacity: hoveredService ? 1 : 0,
      transition: 'opacity 0.3s ease',
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '5px 10px',
      borderRadius: '4px',
    },
  };

  return (
    <Layout>
      <Box
        sx={{
          my: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4": {
              fontSize: "1.5rem",
            },
          },
        }}
      >
        <Typography variant="h4">Service Categorization</Typography>
        
        <div style={styles.container}>
          <div style={styles.row}>
            {services.slice(0, 3).map((service, index) => (
              <div 
                key={index} 
                style={styles.item}
                onMouseEnter={() => handleMouseEnter(service.name)}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={service.src} 
                  alt={service.name} 
                  style={styles.image} 
                />
                <div style={styles.caption}>{service.name}</div>
              </div>
            ))}
          </div>
          
          <div style={styles.row}>
            {services.slice(3, 6).map((service, index) => (
              <div 
                key={index} 
                style={styles.item}
                onMouseEnter={() => handleMouseEnter(service.name)}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={service.src} 
                  alt={service.name} 
                  style={styles.image} 
                />
                <div style={styles.caption}>{service.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Display hovered service name */}
      </Box>
    </Layout>
  );
};

export default Services;
