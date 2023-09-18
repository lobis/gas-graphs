import React from "react";
import "../style/Footer.css";

function Footer(){
    return (

        <footer className="footer-distributed">
			<div className="footer-left">
				<h3>Gas<span>Graphs</span></h3>
				<p className="footer-links">
					<a href="/gas-graphs/">Home</a>
					<a href="/gas-graphs/about"> About</a>
					<a href="/gas-graphs/contact"> Contact</a>
				</p>
			</div>
			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>Facultad de Ciencias </span>Pedro Cerbuna, 12. 50009 Zaragoza</p>
				</div>
			</div>
			<div className="footer-right">
				<div className="footer-icons">
					<a href="https://github.com/lobis"><i className="fa fa-github"></i></a>
				</div>
			</div>
		</footer>
    );
}
export default Footer;