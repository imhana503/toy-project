//선택자
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//이벤트 리스너
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//todolist 추가
function addTodo(event){
  event.preventDefault();
  //todoDiv div 생성
  const todoDiv = document.createElement('div'); 
  todoDiv.classList.add('todo');

  //newTodo li 생성
  const newTodo = document.createElement('li'); 
  newTodo.innerText = todoInput.value; //input 입력값 삽입
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo); // todoDiv 안에 newTodo 삽입

  //로컬저장소에 저장
  saveLocalTodos(todoInput.value);

  //완료 버튼 생성
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('completed-btn');
  todoDiv.appendChild(completedButton);

  //삭제 버튼 생성
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //todoList 태그에 todoDiv 삽입
  todoList.appendChild(todoDiv);

  //input 입력된 텍스트 삭제
  todoInput.value = '';
}


//삭제 이벤트
function deleteCheck(e){
  const item =  e.target; 
  /*
    fas -> css pointer-events: none; 
    클릭 시 e.target === fas 선택되면 작동 안됨으로 클릭이벤트를 삭제해줌
  */

  // todolist 삭제                       
  if(item.classList[0] === 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall'); //todolist 밑으로 떨어지는 효과
    todo.addEventListener('transitionend', function(){ //animation 작동 후 이벤트가 실행(todo.remove() 그냥 실행 하면 animation 효과 X)
      todo.remove();  
    });
    removeLocalTodos(todo);
  }

  // 완료여부 체크
  if(item.classList[0] === 'completed-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed'); 
  }
}

//셀렉트박스 필터
function filterTodo(e){
   const todos = todoList.childNodes;
   todos.forEach(function(todo){
     switch(e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed" :
        if(todo.classList.contains('completed')){ //.contains() -> 포함되어있다면
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted" :
        if(!todo.classList.contains('completed')){ 
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
     }
   });
}

//로컬저장
function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//로컬저장된값 보여주기
function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //todoDiv div 생성
    const todoDiv = document.createElement('div'); 
    todoDiv.classList.add('todo');

    //newTodo li 생성
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todo; //input 입력값 삽입
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // todoDiv 안에 newTodo 삽입

    //완료 버튼 생성
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //삭제 버튼 생성
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //todoList 태그에 todoDiv 삽입
    todoList.appendChild(todoDiv);

  });
}

//로컬저장소 todo 배열 삭제
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}


