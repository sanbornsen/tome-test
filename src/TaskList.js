import React from 'react';

const TaskList = (props) => {
    const {
        task,
        done,
        onChange,
        onDelete
    } = props;

    return <li style={{listStyleType: 'none'}}>
        <input type="checkbox" checked={done} onChange={onChange}/>
        <span style={{textDecoration: done ? 'line-through' : 'none'}}>{task}</span>
        <button onClick={onDelete}>Delete</button>
    </li>
}

export default TaskList;
