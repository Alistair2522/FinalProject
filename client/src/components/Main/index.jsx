import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
	<>
	<div className=" eb-garamond-main" style={{ backgroundColor: "#C5EBAA" }}>
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1 id="eb-garamond-main">Event Harbor</h1>
        <div className={styles.nav_buttons}>
          <Link to="/calendar">
		  <button className={styles.white_btn} style={{ color: 'black' }}>Calendar</button>

          </Link>
          <Link to="/dashboard">    
          <button className={styles.white_btn} style={{ color: 'black' }} >
            Admin
          </button>
          </Link>
        </div>
      </nav>
    </div>

    <div className="mt-4 pt-5 d-flex justify-content-center">
  <div className="image-container">
    <Figure>
      <Figure.Image
        width={600}
        height={400}
        id="image"
        alt="171x180"
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="curved-border"
      />
    </Figure>
  </div>
  <div className="text-container">
    <Figure.Caption id="assistant-para">
      <br/>
      <br/>
      
      Different committees need a way to set up events and get approvals from the right college departments.
      <br />
      Students should also have a way to join in on these events and stay in the loop about what's happening on campus.
      <br />
      Committees should be able to check out when rooms and venues are available so that events don't accidentally overlap.
    </Figure.Caption>
  </div>
</div>


    




    <div className="mt-5 pt-5 d-flex justify-content-center">
	<Card style={{ width: '18rem', margin: '0 10px 20px 10px' }}>
  <Card.Img
    variant="top"
    src="https://images.unsplash.com/photo-1611302457661-d24c21494f2a?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style={{ height: '200px', objectFit: 'cover' }} // Set height and object-fit
  />
  <Card.Body>
    <Card.Title>Calendar</Card.Title>
    <Card.Text>
      Be updated with the upcoming and ongoing events using our calendar.
    </Card.Text>
    <div style={{ position: 'relative', marginTop: 'auto', paddingLeft: '10px' }}>
      <Link to="/calendar">
        <Button variant="primary">Calendar</Button>
      </Link>
    </div>
  </Card.Body>
</Card>

<Card style={{ width: '18rem', margin: '0 10px 20px 10px' }}>
  <Card.Img
    variant="top"
    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style={{ height: '200px', objectFit: 'cover' }} // Set height and object-fit
  />
  <Card.Body>
    <Card.Title>Registration</Card.Title>
    <Card.Text>
      Students can register for the event and participate in the event.
      <br />
      {/* Add line break */}
    </Card.Text>
    <div style={{ position: 'relative', marginTop: 'auto', paddingLeft: '10px' }}>
      <Link to="/cal">
        {/* <Button variant="primary">Register</Button> */}
      </Link>
    </div>
  </Card.Body>
</Card>

<Card style={{ width: '18rem', margin: '0 10px 20px 10px' }}>
  <Card.Img
    variant="top"
    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style={{ height: '200px', objectFit: 'cover' }} // Set height and object-fit
  />
  <Card.Body>
    <Card.Title>Committees</Card.Title>
    <Card.Text>
      Committees can host events and manage the participants.
    </Card.Text>
    <div style={{ position: 'relative', marginTop: 'auto', paddingLeft: '10px' }}>
      <Link to="/cal">
        {/* <Button variant="primary">Committee</Button> */}
      </Link>
    </div>
  </Card.Body>
</Card>


</div>

  </div>

	</>
  );
};

export default Main;
