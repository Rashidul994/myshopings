
'use client'
import React from 'react';
import {useParams}  from 'next/navigation';


export default function ComponentName() {

  const params = useParams();

  const id = params.brand;

  return (
    <>

    <h3> product videw {id} </h3>
    
    </>
  );
}
