const { expect } = require('chai');
const { ethers } = require('hardhat')

describe("TodoList Contract" , () => {
    let TodoContract;
    let todoContract
    let owner

    const NUM_TOTAL_TODOS = 5;

    let totalTodos;

    beforeEach(async function() {
        TodoContract = await ethers.getContractFactory("TodoList");
        [owner] = await ethers.getSigners()
        todoContract = await TodoContract.deploy()

        totalTodos = []

        for(let i = 0; i < NUM_TOTAL_TODOS; i++ ){
            let todo = { 'title': "So cool " + i}

            await todoContract.addTodo(todo.title)
            totalTodos.push(todo)
        }
    })

    describe("Add Todo", ()=> {
        it("should emit AddTodo event", async() => {
            let todo = { 'title': "So coool"}

            await expect(await todoContract.addTodo(todo.title))
            .to.emit(todoContract, "AddTodo").withArgs(owner.address, NUM_TOTAL_TODOS)
        })
    })

    describe("Get All Todos", ()=> {
        it("should return all my todos", async() => {
           let todosFromChain = await todoContract.getMyTodos()
           expect(todosFromChain.length).to.equal(NUM_TOTAL_TODOS)
        })
    })

    describe("Delete Todo", ()=> {
        it("should emit DeleteTodo event", async() => {
            const TODO_ID = 0
            const TODO_DELETE = true

            expect(await todoContract.deleteTodo(TODO_ID, TODO_DELETE))
           .to.emit(todoContract, "DeleteTodo").withArgs(TODO_ID, TODO_DELETE)
        })
    })

    describe("Complete Todo", ()=> {
        it("should emit complete todo event", async () => {
            const TODO_ID = 0
            const TODO_UPDATE = true

            expect( await todoContract.completeTodo(TODO_ID, TODO_UPDATE))
            .to.emit(todoContract, "CompleteTodo").withArgs(TODO_ID, TODO_UPDATE)
        })
    })

    describe("Update Todo", () => {
        it("should return todo completed", async() => {
            const TODO_ID = 0
            const TODO_VALUE = 'So shway'

            expect(await todoContract.updateTodo(TODO_ID, TODO_VALUE))
            .to.emit(todoContract, "UpdateTodo").withArgs(TODO_ID, TODO_VALUE)
        })
    })


})