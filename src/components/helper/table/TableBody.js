import React from 'react';
import TransformDate from '../utils/TransformDate';
import INR from '../utils/INR';

export default function TableBody(items, arr) {
  return (
    <tbody>
      {items.map(item => (
        <tr key={item.id} id={item.id}>
          {arr.map(element => {
            if (element === 'amount')
              return <td>{INR.format(item[element] / 100)}</td>;
            else if (element === 'created_at')
              return <td>{TransformDate(item[element])}</td>;
            else
              return <td>{item[element]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}