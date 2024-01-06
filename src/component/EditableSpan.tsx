import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = ({title, onChange}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const onActivateHandler = () => {
        setEditMode(!editMode)
        onChange(newTitle)
    }

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
         setNewTitle(e.currentTarget.value)
    }
    return editMode
        ? <input value={newTitle} onBlur={onActivateHandler} onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={onActivateHandler}>{title} </span>

};

