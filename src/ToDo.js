import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';

const ToDo = () => {

    const [ taskInp, setTaskInp ] = useState();
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        const fromCookies = localStorage.getItem('tasks');
        if (fromCookies) {
            setTasks(JSON.parse(fromCookies));
        }
    }, []);

    const handleChange = (event) => {
        setTaskInp(event.target.value);
    }

    const handleTaskChange = (id, state) => {
        const idx = tasks.findIndex(t => t.id === id);
        if (idx > -1) {
            tasks[idx].done = state;
        }
        localStorage.setItem('tasks', JSON.stringify([...tasks]));
        setTasks([...tasks]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskInp.trim()) {
            // Sumit the task
            const newTask = {
                task: taskInp,
                done: false,
                id: `id-${tasks.length + 1}}`
            }
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
            setTasks([...tasks, newTask]);
            // Empty the input state
            setTaskInp('');
        }
    }

    const handleDelete = (taskID) => {
        const newtasks = tasks.filter(t => t.id !== taskID);
        localStorage.setItem('tasks', JSON.stringify([...newtasks]));
        setTasks(newtasks);
    }

    return <div>
        <ul>
            {tasks.map((task) => {
                return <TaskList
                    key={task.id}
                    task={task.task}
                    done={task.done}
                    onChange={() => handleTaskChange(task.id, !task.done)}
                    onDelete={() => handleDelete(task.id)}
                />
            })}
        </ul>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={taskInp} name="task" />
            <button type="submit">Add</button>
        </form>
    </div>;
}

export default ToDo;
