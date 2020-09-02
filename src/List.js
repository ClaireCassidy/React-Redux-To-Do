import React from 'react'
import './List.css'
import ListItem from './ListItem'
import { useSelector } from 'react-redux';

// action : change page (pagination)

export default function List() {

    const todoItems = useSelector((state) => {
        return state.todos;
    })
    //console.log("Items: "+JSON.stringify(todoItems));
    
    return (
        <div className="ListContainer">
            {/* {todoItems.map((item) => {
                return (<p key={Date.now()+Math.random()} className="TodoItem">{JSON.stringify(item)}</p>);
            })} */}
            {todoItems.map((item) => {
                //console.log(JSON.stringify(item));
                return (<ListItem todoItem={item} key={item.dateAdded+item.id}/>);
            })}
        </div>
    )
}
