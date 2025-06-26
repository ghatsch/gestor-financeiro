'use client'

import React from 'react';
import './title.css';

type HeaderProps = {
    title: string;
}

export default function TitleHeader({title} : HeaderProps){
    return(
        <>
         <div className="titulo">
             <h1>{title}</h1>
        </div>

        </>
    );
}
