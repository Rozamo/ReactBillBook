import React from 'react';
import TransformDate from '../utils/TransformDate';
import INR from '../utils/INR';

export default function TableBody(items, arr, submitSuccess) {

  function handleClassName(itemIndex, arrIndex) {
    if (submitSuccess && itemIndex === 0) {
      switch(arrIndex) {
        case 0:
          return 'newTD firstTD';
        case arr.length - 1:
          return 'newTD lastTD';
        default:
          return 'newTD middleTD';
      }
    }
  }

  return (
    <tbody>
      {items.map((item, itemIndex) => (
        <tr key={item.id}>
          {arr.map((element, arrIndex) => {
            if (element === 'amount')
              return <td key={arrIndex} className={handleClassName(itemIndex, arrIndex)} >{INR.format(item[element] / 100)}</td>;
            else if (element === 'created_at')
              return <td key={arrIndex} className={handleClassName(itemIndex, arrIndex)} >{TransformDate(item[element])}</td>;
            else
              return <td key={arrIndex} className={handleClassName(itemIndex, arrIndex)} >{item[element]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}