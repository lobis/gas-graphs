import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../style/Contact.css";
import image from '../style/map_image.png';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone]  = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      subject,
      message,
    };
   
    fetch("https://formspree.io/f/mpzgwvjj", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }).catch((err) => {
      alert("Something went wrong, please try again later.");
      console.log(err);
    }
    );

  };

    return (
        <div className="contact-page">
        <Navbar />
        <div className="content">
          <div className="container">
          <div className="form">
            <Typography variant="h4" align="center" mb={2}>
            Send us Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />
                </div>
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  type="email"
                />
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                <TextField 
                  fullWidth
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  margin="normal"
                  type="number"
                  required
                />
                </div>
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  margin="normal"
                  required
                />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  margin="normal"
                  required
                  multiline
                  rows={4}
                />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Send Message
                </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="image">
            <a href="https://goo.gl/maps/Pq4f1xvK7iJqfjxA9">
               <img src={image} alt="" />
            </a>
          </div>
    </div>
  </div>
  <Footer />
   </div>
    );
};

export default Contact;

