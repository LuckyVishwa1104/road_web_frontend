import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";
import img1 from "../images/man.png";
import img2 from "../images/woman.png";

const Team = () => {
  const teamMembers = [
    { src: img1, name: 'Lucky Vishwakarma' },
    { src: img2, name: 'Amruta Pradhan' },
    { src: img2, name: 'Maheen Shaikh' },
    { src: img1, name: 'Ashutosh Gaware' }
  ];

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '20px',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '10px',
    },
    image: {
      width: '150px',
      borderRadius: '8px',
    },
    caption: {
      marginTop: '5px',
      fontSize: '16px',
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
        <Typography variant="h4">Our Team</Typography>
        
        <div style={styles.container}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.item}>
              <img 
                src={member.src} 
                alt={member.name} 
                style={styles.image} 
              />
              <div style={styles.caption}>{member.name}</div>
            </div>
          ))}
        </div>
        
        {/* Additional content */}
        <p>
          {/* Your text content here */}
        </p>
      </Box>
    </Layout>
  );
};

export default Team;
