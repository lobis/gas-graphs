// home page
import React from 'react';
import Chart from '../components/Chart';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';

const Home = () => {
    return (
        <div>
        <div>
            <Navbar />
        </div>
        <br></br>
        <div>
            <Chart />
        </div>
        <div>
            <Footer />
        </div>
        </div>
    );
};

export default Home;
