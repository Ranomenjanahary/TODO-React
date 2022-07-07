import logo from './logo.svg';
import './App.css';
import { ClassAttributes, HTMLAttributes, LegacyRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const listItems = [
    {
        id : '1',
        name: 'Ralobo'
    },
    {
        id : '2',
        name: 'Ralobo1'  
    },
    {
        id : '3',
        name: 'Ralobo2'
    },
    {
        id : '4',
        name: 'Ralobo3'  
    },
    {
        id : '5',
        name: 'Ralobo4'
    },
    {
        id : '6',
        name: 'Ralobo5'  
    }
]

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin:`0 50px 15px 50px`,
    background: isDragging ? "#4a2975" : "white",
    color: isDragging ? 'white': 'black',
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle 
})

function App() {
    const [todo, setTodo] = useState(listItems)

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result
        if(!destination) return

        const items = Array.from(todo)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)

        setTodo(items)
    }
    return (
         <div className="App">
             <h1>Drag and Drop</h1>
             <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todo">
                    {(provided: { droppableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; innerRef: LegacyRef<HTMLDivElement> | undefined; }) => (
                        <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
                            {todo.map(({id, name}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided: { innerRef: LegacyRef<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; }, snapshot: { isDragging: boolean; }) => (
                                            <div ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                {name}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </div>
                    )}
                </Droppable>
             </DragDropContext>
         </div>
    );
    }

 export default App;

