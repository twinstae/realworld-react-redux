import React from 'react'

export default function Hello(props) {
    return props.name ?
        <h1>Hello, {props.name}!</h1> :
        <span>Hey, stranger</span>;
}