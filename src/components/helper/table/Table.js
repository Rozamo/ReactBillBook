import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

export default function Table(items, tableHead, tableBody) {
    return (
      <table className="inv-table" id="inv-table">
        {TableHead(tableHead)}
        {TableBody(items, tableBody)}
      </table>
    );
}