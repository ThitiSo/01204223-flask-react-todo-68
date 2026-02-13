import { render, screen, fireEvent } from '@testing-library/react'   // เพิ่ม *** fireEvent
import userEvent from '@testing-library/user-event'

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
  it('makes callback to toggleDone when Toggle button is clicked', () => {
    const onToggleDone = vi.fn();
    render(
      <TodoItem 
       todo={baseTodo} 
       toggleDone={onToggleDone} />
    );
    const button = screen.getByRole('button', { name: /toggle/i });
    button.click();
    expect(onToggleDone).toHaveBeenCalledWith(baseTodo.id);
  });
    it('makes callback to deleteTodo when delete button is clicked', () => {
        const onToggleDelete = vi.fn();
            render(
      <TodoItem 
       todo={baseTodo} 
       deleteTodo={onToggleDelete} />
    );
        const button = screen.getByRole('button', { name: /❌/i });
    button.click();
    expect(onToggleDelete).toHaveBeenCalledTimes(1);
  expect(onToggleDelete).toHaveBeenCalledWith(baseTodo.id);
    //
    // *** TODO: เขียนเอง
    //
  });
   it('makes callback to addNewComment when a new comment is added', async () => {
    const onAddNewComment = vi.fn();
    render(
<TodoItem 
      todo={baseTodo} 
      addNewComment={onAddNewComment} 
    />
    );

    // พิมพ์ข้อความลงใน textbox
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'New comment');

    // กดปุ่ม: ในที่นี้เราใช้ fireEvent เพราะว่าระหว่างการอัพเดทจะมีการเปลี่ยน state ถ้าไม่ใช่จะมี warning
    const button = screen.getByRole('button', { name: /add comment/i });
    fireEvent.click(button);

    // assert
    expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, 'New comment');
  });
});


