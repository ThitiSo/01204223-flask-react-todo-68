import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import TodoItem from '../ToDoItem.jsx'
const baseTodo = {             // ** TodoItem พื้นฐานสำหรับทดสอบ
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};
const todoWithComment = {
    ...baseTodo,
    comments: [
    {id: 1, message: 'First comment'},
    {id: 2, message: 'Another comment'},
    ]
};


describe('TodoItem', () => {
it('renders with no comments correctly', () => {    
    render(
      <TodoItem todo={baseTodo} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
  });
it('renders with comments correctly', () => {
    render(
      <TodoItem todo={todoWithComment} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Another comment')).toBeInTheDocument();

  });
 it('renders with no comments correctly', () => {
     render(
      <TodoItem todo= {baseTodo} />
    );
    // ... ละตอนต้นไว้
    expect(screen.getByText('No comments')).toBeInTheDocument();
  });
   it('renders no of comments correctly', () => {
     render(
      <TodoItem todo= {todoWithComment} />
    );
    // ... ละตอนต้นไว้
     expect(screen.getByText(/2/)).toBeInTheDocument();
  });
});