import React from 'react'
import './List.css'
import { useSelector } from 'react-redux';

export default function List() {

    const todoItems = useSelector((state) => {
        return state.todos;
    })
    console.log("Items: "+JSON.stringify(todoItems));
    
    return (
        <div className="ListContainer">
            {todoItems.map((item) => {
                return (<p key={Date.now()+Math.random()} className="TodoItem">{JSON.stringify(item)}</p>);
            })}
        </div>
    )
}
