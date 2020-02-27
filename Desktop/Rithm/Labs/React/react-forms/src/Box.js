import React, { useState } from 'react';

function Box({ width = 100, height = 100, backgroundColor }) {
    console.log("inside the box", width, height, backgroundColor)
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: backgroundColor
    }

    return <div><li style={style}></li></div>
}

export default Box;