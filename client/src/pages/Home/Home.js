import React from "react";
import { Container, Row, Col } from 'reactstrap';
import "./Home.css";
import bkgImg from "../../cat-and-dog.jpg";
import logo from "../../finding-fido-logo.svg";

const Home = () =>   
  <Container className="bord-box background">
    <Row>
			<Col xs="3"></Col>
      <Col xs="auto"><img src={logo} className="App-logo" alt="Finding Fido" /></Col>
      <Col xs="3"></Col>
		</Row>
		<Row>
			<Col xs="3"></Col>
      <Col xs="auto">Your one stop source for finding the rescue dog of your dreams! Take a short quiz to figure out the dogs best suited to your lifestyle and needs. Save your search results by creating an account.</Col>
      <Col xs="3"></Col>
		</Row>
		<Row>
			<Col xs="3"></Col>
      <Col xs="auto">
				<div class="bord-rad-2 disp-inlineblock marg-10">
				</div>
				<div class="bord-rad-2 disp-inlineblock marg-10">
					<a href="">
						<button class="intro-button">Occasions</button>
					</a>
				</div>
				</Col>
      <Col xs="3"></Col>
		</Row>
	</Container>

	export default Home;