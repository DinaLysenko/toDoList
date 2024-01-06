import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormProps={
    addFormTitle: (title: string)=>void
}
export const AddItemForm:React.FC<AddItemFormProps> = ({addFormTitle}) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addFormTitle(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    const styles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }
    return (
        <div>
            <TextField error={!!error}
                       size='small'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       id="outlined-basic"
                       label={error ? error : 'type smth...'}
                       variant="outlined"
            />
            <Button variant="contained" size="small" onClick={addTaskHandler} style={styles}>+</Button>
        </div>
    );
};

