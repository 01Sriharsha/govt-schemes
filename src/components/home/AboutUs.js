import React from 'react'
import { Container } from 'react-bootstrap'

export default function AboutUs() {
    const style = {
        marginTop: '2%',
        marginLeft: '7%',
        width: '85%',
        padding: '50px',
        textAlign: 'center',
        // backgroundColor: '#474e5d',
        color: 'white'
    }
    return (
        <Container>
            <div className='bg-color rounded shadow' style={style}>
                <h1>Computer Paradise</h1>
                <p>Computer Paradise Founded in 1993 in Mysuru and provides IT & Managed Services throughout Mysuru and surroundings. We maintain
                    a far-reaching network by technicians who are highly experienced, proficient and available to work
                    throughout Mysuru. Our core strengths are years of technical and operational experience and our
                    internal processes which leverage our best-of-breed technology. Our goal is to be “flawless” in the eyes of
                    our customers and deliver a true world-class IT support service. We are technologist but our focus is on our
                    customers and their businesses. We understand that you want your IT problems resolved quickly, effectively
                    and at reasonable cost, so that you can focus on your business and not your IT problems. We bring peace of
                    mind & security to the management and operation of IT assets for their entire life-cycle. Our strategic
                    intellectual property includes its flagship application reveal, speck an innovative and integrated modular
                    Enterprise Software for the trading industry.</p>
                <h3 class="mt-5 mb-3">Address:</h3>
                <p>Madhuvana Layout, Srirampura</p>
                <p>Mysore - 570023.</p>
            </div>
        </Container>
    )
}
