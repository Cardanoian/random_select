'use strict';

// 학생 목록을 저장하는 배열
const students = [];

// 화면에서 사용할 요소를 한 번에 찾아둔다
const nameInput = document.getElementById('nameInput');
const addForm = document.getElementById('addForm');
const studentList = document.getElementById('studentList');
const countEl = document.getElementById('count');
const emptyMsg = document.getElementById('emptyMsg');
const resultEl = document.getElementById('result');
const pickBtn = document.getElementById('pickBtn');
const resetBtn = document.getElementById('resetBtn');

// 학생 한 명을 목록에 추가하는 함수
function addStudent(name) {
  const trimmed = name.trim();
  if (trimmed === '') return; // 빈 이름은 추가하지 않는다
  students.push(trimmed);
  render();
}

// 학생 한 명을 삭제하는 함수
function removeStudent(index) {
  students.splice(index, 1);
  render();
}

// 화면에 학생 목록을 다시 그리는 함수
function render() {
  studentList.innerHTML = '';
  countEl.textContent = students.length;

  // 학생이 없으면 빈 안내 문구를 보여준다
  if (students.length === 0) {
    emptyMsg.hidden = false;
    return;
  }
  emptyMsg.hidden = true;

  // 각 학생을 목록 항목으로 만든다
  students.forEach((name, index) => {
    const li = document.createElement('li');
    li.className = 'student-list__item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'student-list__name';
    nameSpan.textContent = name;

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn--icon btn--danger';
    delBtn.textContent = '삭제';
    delBtn.setAttribute('aria-label', name + ' 삭제');
    delBtn.addEventListener('click', () => removeStudent(index));

    li.appendChild(nameSpan);
    li.appendChild(delBtn);
    studentList.appendChild(li);
  });
}

// 발표자를 무작위로 한 명 뽑는 함수
function pickPresenter() {
  // 학생이 없으면 안내 문구만 보여준다
  if (students.length === 0) {
    resultEl.textContent = '먼저 학생을 추가해 주세요';
    resultEl.classList.remove('is-picked');
    return;
  }
  const randomIndex = Math.floor(Math.random() * students.length);
  resultEl.textContent = students[randomIndex];
  resultEl.classList.add('is-picked');
}

// 전체 초기화 함수
function resetAll() {
  const ok = window.confirm('학생 목록과 발표자 결과를 모두 지울까요?');
  if (!ok) return;
  students.length = 0;
  resultEl.textContent = '버튼을 눌러 발표자를 뽑아보세요';
  resultEl.classList.remove('is-picked');
  render();
}

// 폼 제출(추가 버튼 또는 Enter) 처리
addForm.addEventListener('submit', (event) => {
  event.preventDefault(); // 페이지 새로고침 막기
  addStudent(nameInput.value);
  nameInput.value = '';
  nameInput.focus();
});

pickBtn.addEventListener('click', pickPresenter);
resetBtn.addEventListener('click', resetAll);

// 처음 한 번 화면을 그린다
render();
