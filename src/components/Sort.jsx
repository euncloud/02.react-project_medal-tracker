import React, { useState } from 'react'

function Sort({ setSortValue}) {
    const handleSelectBox = (e) => {
        setSortValue(e.target.value);
    }

    return (
        <div className='select-box-div'>
            <select onChange={handleSelectBox}>
                <option value="gold">금메달 순위</option>
                <option value="silver">은메달 순위</option>
                <option value="bronze">동메달 순위</option>
                <option value="total">총 합계 순위</option>
            </select>
        </div>
    )
}

export default Sort