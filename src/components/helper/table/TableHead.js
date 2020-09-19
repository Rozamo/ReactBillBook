import React from 'react';

export default function TableHead(...arr) {
  return <thead>
    <tr>
      {arr.map((element, index) => (
        <th key={index}>{element}</th>
      ))}
    </tr>
  </thead>;
}