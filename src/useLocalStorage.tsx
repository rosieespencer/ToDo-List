import {useState, useEffect } from 'react'

type Todo = { id: number; task: string; completed: boolean; };

export function useLocalStorage(key: string, initialValue: Todo[]): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>]{
    const [value, setValue] = useState<Todo[]>(() => { 
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}