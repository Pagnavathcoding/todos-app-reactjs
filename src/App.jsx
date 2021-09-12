import React from 'react';
import { useState, useEffect } from 'react';
import "./index.css";
function local() {
    const stored = localStorage.getItem("data");
    if (stored) {
        return JSON.parse(localStorage.getItem("data"));
    }
    else {
        return []
    }
}
function App() {
    const [value, setValue] = useState('');
    const [data, setData] = useState(local());
    function submit(e) {
        e.preventDefault();
        if (value === '') return;
        setData([{ id: Date.now(), text: value, done: false }, ...data]);
        setValue('');
    }
    function deleteItem(id) {
        const another = data.filter((data) => {
            return data.id !== id;
        })
        setData(another);
    }
    function updateItem(id, infos) {
        setValue(infos);
        const update = data.filter((data) => {
            return data.id !== id;
        })
        setData(update);
    }
    function checked(id) {
        setData(data.map((data) => {
            return data.id === id ? { ...data, done: !data.done } : data;
        }))
    }
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]);
    return (
        <div>
            <i style={{ textDecoration: "underline orangered" }}>todos app</i>
            <form onSubmit={submit} style={{ padding: "0.5em 0" }}>
                <input type="text" placeholder="Enter..." value={value} onChange={(e) => setValue(e.target.value)} style={{ height: "30px", padding: "0 0.5em" }} />
                <button type="submit" style={{ height: "30px", width: "30px" }}>Add</button>
            </form>
            <div>
                {
                    data.map((data, index) => {
                        return <div key={data.id} style={{ width: "300px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0 0.5em 0" }}>
                            <div style={{ display: "flex", width: "300px" }}>
                                <p style={{ textDecoration: data.done ? "line-through" : "none" }} onClick={() => checked(data.id)}>{index + 1}. {data.text}</p>
                                <p style={{ padding: "0 0.5em" }}>-&gt; {data.done ? <span style={{ color: "rgb(52 168 83)" }}>Done</span> : ""}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p style={{ cursor: "pointer" }} onClick={() => updateItem(data.id, data.text)}>✏️</p>
                                <button onClick={() => deleteItem(data.id)} style={{ margin: "0 0.5em" }}>delete</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default App;