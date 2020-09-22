import React from 'react';

export default function TableHead(arr) {
  return (
    <thead>
      <tr>
        {arr.map((element) => (
          <th>{element}</th>
        ))}
      </tr>
    </thead>
  );
}
