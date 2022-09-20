// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {

   struct Todo{
       uint id;
       string title;
       bool isCompleted;
       bool isDeleted;
   }

   event AddTodo(address recipient, uint todoId);
   event DeleteTodo(uint taskId, bool isDeleted);
   event CompleteTodo(uint taskId, bool isCompleted);
   event UpdateTodo(uint taskId, string value);

   Todo[] private todos;

   mapping(uint => address) private todoToOwner;

   function getMyTodos() external view returns(Todo[] memory) {
       Todo[] memory temporary = new Todo[](todos.length);
       uint counter = 0;

       for(uint i = 0; i < todos.length; i ++ ){
         if(todoToOwner[i] == msg.sender && todos[i].isDeleted == false){
            temporary[i] = todos[i];
            counter++;
         }
       }

       Todo[] memory result = new Todo[](counter);
       for(uint i = 0; i < counter; i ++ ){
         if(todoToOwner[i] == msg.sender && todos[i].isDeleted == false){
            result[i] = temporary[i];
         }
       }

       return result;
       
   }

   function addTodo(string memory _title) external {
       uint todoId = todos.length;
       todos.push(Todo(todoId, _title, false, false));
       todoToOwner[todoId] = msg.sender;
       emit AddTodo(msg.sender, todoId);
   } 

   function completeTodo(uint _id, bool _value) external {
       require(todoToOwner[_id] == msg.sender, "Cannot modify this todo");
       todos[_id].isCompleted = _value; 
       emit CompleteTodo(_id, _value);
   }

   function updateTodo(uint _id, string memory _title) external {
      todos[_id].title = _title;
      emit UpdateTodo(_id, _title);
   }  

   function deleteTodo(uint _id, bool _value) external {
       require(todoToOwner[_id] == msg.sender, "Cannot deletes this todo");
       todos[_id].isDeleted = _value; 
       emit DeleteTodo(_id, _value);
   }

}