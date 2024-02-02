import './App.css';
import React, { useState } from 'react';

function Todo2() {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);
    const [editIndex, setEditIndex] = useState(false);
    const [id, setid] = useState();
    const [search, setsearch] = useState("");
    const [store,setstore] =useState([]);

    
    const btnhandler = () => {
        if (editIndex) {
            const result = [...tasksList];
            result[id].task = task; 
            setTasksList(result);
            setEditIndex(false);
        } else {
            setTasksList([...tasksList, { task, checked: false }]); 
            setstore([...tasksList, { task, checked: false }]); 

        }
        setTask("");
    };

    const deleteHandler = (index) => {
        let del = tasksList.filter((ele, ind1) => {
            return index !== ind1;
        });
        setTasksList(del);
        setstore(del);
    };

    const editHandler = (index) => {
        setTask(tasksList[index].task);
        setid(index);
        setEditIndex(true);
    };

    const toggleComplete = (index) => {
        const updatedTodos = [...tasksList];
        updatedTodos[index].checked = !updatedTodos[index].checked;
        setTasksList(updatedTodos);
        setstore(updatedTodos);
    };

    const searchHandler = () => {
        var data = store.filter((ele, index) => {
            return ele.task === search;
        });
        setTasksList(data);
        setsearch("");
    };

    const completebtn=()=>{
        let btn=store.filter((ele,ind)=>{
            return ele.checked == true;
        })
        // console.log(btn);
        setTasksList(btn);
    }

    const uncompletebtn=()=>{
        let btn=store.filter((ele,ind)=>{
            return ele.checked == false;
        })
        setTasksList(btn);
    }

    const allbtn=()=>{
        setTasksList([...store]);
    }

    return (
        <>
            <center>
              <h1 className='header'>TO DO LIST</h1>
                <div className='list'>  
                    <input type='text' placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)}></input>
                    <button onClick={btnhandler}>Add Task</button>
                </div>
                <div className='add_btn'>
                  
                    <button onClick={completebtn}>checked Tasks</button>
                    <button onClick={uncompletebtn}>Unchecked Tasks</button>
                    <button onClick={allbtn}>All Tasks</button>
                    <br></br>
                    <input type='text' placeholder='Search task..' value={search} onChange={(e) => setsearch(e.target.value)} />
                    <button onClick={searchHandler}>Search</button>
                </div>
                <ul>
                    {tasksList.map((taskObj, index) => (
                        <li key={index}>
                            <input type="checkbox" checked={taskObj.checked} onChange={() => toggleComplete(index)} />
                            <span style={{ textDecoration: taskObj.checked ? 'line-through' : 'none' }}>{taskObj.task}</span>
                            <button onClick={() => deleteHandler(index)}>DELETE</button>
                            <button onClick={() => editHandler(index)}>EDIT</button>
                        </li>
                    ))}
                </ul>
            </center>
        </>
    );
}

export default Todo2;