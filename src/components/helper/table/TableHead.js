import React from 'react';

export default function TableHead(arr) {
  return (
    <thead>
      <tr>
        {arr.map((element, index) => (
          <th key={'vtsqu97ub6'+index}>{element}</th>
        ))}
      </tr>
    </thead>
  );
}
