import React, { useState } from 'react';
import uuid from "uuid/v4";
import Box from './Box';
import NewBoxForm from './NewBoxform'


function Boxlist() {
    const [boxes, setBoxes] = useState([{ width: 100, height: 100, backgroundColor: "red", id: "key" }])

    console.log(boxes[0], typeof boxes)

    const renderBoxes = () => {
        return boxes.map(box =>
            (<Box key={box.id} props={box} />))
    };

    const addBox = box => {
        let newBox = { ...box, id: uuid() };
        setBoxes(boxes => [...boxes, newBox])
    }

    return (<div>
        <ul> {renderBoxes()} </ul>
        <NewBoxForm addBox={addBox} />
    </div>)

};


export default Boxlist;