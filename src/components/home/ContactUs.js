import React from 'react'
import { Container } from 'react-bootstrap'

export default function ContactUs() {
  return (
    <Container fluid="md">
    <div className='mx-auto bg-color d-flex justify-content-center align-items-center mt-4 text-light w-50 shadow rounded p-3'>
      <section class="mb-4">
        <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
        <div class="col text-center mt-4">
            <ul class="list-unstyled mb-0 float-center ">
                <li><i class="fas fa-map-marker-alt fa-2x"></i>
                    <p>BEML, Mysuru 570028, Karnataka</p>
                </li>

                <li><i class="fas fa-phone mt-4 fa-2x"></i>
                    <p>+91 7899 900 248</p>
                </li>

                <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                    <p>computerparadise1993@gmail.com</p>
                </li>
            </ul>
        </div>
    </section>
    </div>
    </Container>
  )
}

