import React from 'react';

function NumberList() {
    return (
        <div>
            {Array.from({ length: 10 }, (_, index) => (
                <div key={index}>{index + 1}</div>
            ))}
        </div>
    );
}

export default NumberList;
