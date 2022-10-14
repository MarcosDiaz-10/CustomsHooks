import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer";

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    
    const [todos, dispatch] = useReducer( todoReducer, [], init)

    useEffect(() => {
     
        localStorage.setItem('todos', JSON.stringify( todos ) )
      
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDelete = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }

        dispatch( action);
    }
    
    const handleToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch( action );
    }


    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount:todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDelete,
        handleToggleTodo
    } 
  
}
