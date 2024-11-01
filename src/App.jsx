import { useState } from "react";
import './App.css'
import Header from './components/Header'
import Table from './components/Table'
import Sort from './components/Sort'

function App() {
  const title = "2024 파리 올림픽";
  const localStorageMedalList = JSON.parse(localStorage.getItem('medalList')) || []; // localStorage 값에 따라 초기 medalList 설정

  const [country, setCountry] = useState('');
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [medalList, setMedalList] = useState(localStorageMedalList);
  const [sortValue, setSortValue] = useState('gold');

  let hasValue = medalList.some(item => item.country === country);

  /* submit 버튼 클릭 시 추가 / 업데이트 판단 */
  const submitMedalForm = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const btnId = e.nativeEvent.submitter.id;
    btnId === "addBtn" ? addMedalTable() : editMedalTable();
  }

  /* 국가 추가 버튼 클릭 시*/
  const addMedalTable = () => {ㅋ
    const newMedalData = {
      country,
      gold,
      silver,
      bronze,
      total: gold + silver + bronze,
    }

    if (hasValue) {
      alert('이미 등록한 국가입니다');
      return;
    }

    setMedalList([...medalList, newMedalData]);
    saveLocalstorage([...medalList, newMedalData]);

    resetForm();
  }

  /* 업데이트 버튼 클릭 시*/
  const editMedalTable = () => {
    if (!hasValue) {
      const confirmEdit = window.confirm('등록하지 않은 국가입니다. 새로 추가하시겠습니까?');

      if (!confirmEdit) { return; } else { addMedalTable }
    }

    const newMedalData = {
      country,
      gold,
      silver,
      bronze,
      total: gold + silver + bronze,
    }

    const filterMedalList = medalList.filter(item => item.country !== newMedalData.country);
    setMedalList([...filterMedalList, newMedalData])
    saveLocalstorage([...filterMedalList, newMedalData]);

    resetForm();
  }

  const deleteMedalTable = (country) => {
    const filterMedalList = medalList.filter(item => item.country !== country);
    setMedalList(medalList => filterMedalList);

    saveLocalstorage(filterMedalList);

  };

  /* 입력 폼 초기화 */
  const resetForm = () => {
    setCountry('');
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  /* Input에 값을 입력하는 경우 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    if (name === 'country') {
      setCountry(value);
    } else if (name === 'gold') {
      setGold(numValue);
    } else if (name === 'silver') {
      setSilver(numValue);
    } else if (name === 'bronze') {
      setBronze(numValue);
    }
  }

  /* localstorage에 데이터 저장 */
  const saveLocalstorage = (data) => {
    localStorage.setItem('medalList', JSON.stringify(data));
  }

  // 금메달 수에 따라 medalList 정렬
  const sortedMedalList = [...medalList].sort((a, b) => b[sortValue] - a[sortValue]);


  return (
    <>
      <div className="background-div">

        <Header title = {title}/>

        <div className="form-button-div">
          <form id="medal-form" onSubmit={submitMedalForm}>
            <div className="form-group">
              <label htmlFor="country">국가명</label>
              <input type="text" id="country" name="country" value={country} onChange={handleChange} maxLength="15" required placeholder="국가 입력"></input>
            </div>
            <div className="form-group">
              <label htmlFor="country">금메달</label>
              <input type="number" id="gold" name="gold" value={gold} onChange={handleChange} min="0" max="99" required></input>
            </div>
            <div className="form-group">
              <label htmlFor="country">은메달</label>
              <input type="number" id="silver" name="silver" value={silver} onChange={handleChange} min="0" max="99" required></input>
            </div>
            <div className="form-group">
              <label htmlFor="country">동메달</label>
              <input type="number" id="bronze" name="bronze" value={bronze} onChange={handleChange} min="0" max="99" required></input>
            </div>
            <button type="submit" id="addBtn">국가 추가</button>
            <button type="submit" id="updateBtn">업데이트</button>
          </form>
        </div>

        <Sort setSortValue={setSortValue} />

        <Table sortedMedalList={sortedMedalList} deleteMedalTable={deleteMedalTable} />

      </div>
    </>
  );
}

export default App


