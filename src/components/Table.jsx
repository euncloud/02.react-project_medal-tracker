import React from 'react'

function Table({ sortedMedalList, deleteMedalTable }) {
    return (
      <div className="medal-table-div">
        <table className="medal-table">
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedalList.map((item, index) => (
              <tr key={index}>
                <td>{item.country}</td>
                <td>{item.gold}</td>
                <td>{item.silver}</td>
                <td>{item.bronze}</td>
                <td><button onClick={() => deleteMedalTable(item.country)}>삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
export default Table