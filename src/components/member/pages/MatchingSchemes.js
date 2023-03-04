import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import { getMatchingScheme } from '../../../api/memberService'
import { CustomContext } from '../../../context/AuthContext'
import SchemeCard from '../../all-schemes/SchemeCard';

export default function MatchingSchemes() {

  const [schemes, setSchemes] = useState([]);

  const memberData = JSON.parse(sessionStorage.getItem('user'))

  
  useEffect(() => {
    getMatchingScheme(memberData).then(res => {
      console.log(res);
      setSchemes(res.data)
    }).catch(err => {
      console.log(err);
    })
  }, [])


  return (
    <Container>
      <h2 className='text-center my-4 text-s'>Matching Schemes</h2>
      {schemes?.length !== 0
        ? (schemes?.map(scheme => (
          <div className='shadow rounded my-3' key={scheme.id}>
            <SchemeCard scheme={scheme} />
          </div>
        ))
        ) : (
          <div className='d-flex w-100 justify-content-center align-items-center' style={{ height: '70vh' }}>
            <h3>No matching schemes found for your details</h3>
          </div>
        )
      }
    </Container>
  )
}
