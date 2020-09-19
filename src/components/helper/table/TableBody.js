import React from 'react';
import TransformDate from '../utils/TransformDate';
import INR from '../utils/INR';

export default function TableBody(items, arr, newItemID) {
  function handleClassName(idToMatch, index) {
    if (idToMatch === newItemID) {
      if (index === 0)
        return 'newTD firstTD';
      else if (index === arr.length - 1)
        return 'newTD lastTD';
      else
        return 'newTD middleTD';
    }
    return null;
  }
  return (
    <tbody>
      {items.map(item => (
        <tr key={item.id} id={item.id}>
          {arr.map((element, index) => {
            if (element === 'amount')
              return <td className={handleClassName(item.id, index)} >{INR.format(item[element] / 100)}</td>;
            else if (element === 'created_at')
              return <td className={handleClassName(item.id, index)} >{TransformDate(item[element])}</td>;
            else
              return <td className={handleClassName(item.id, index)} >{item[element]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}