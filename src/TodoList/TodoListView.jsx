import {useEffect, useState} from "react";

function TodoListView({ queryString, setQueryString, sortField, setSortField, sortDirection, setSortDirection }) {
   const [localQueryString, setLocalQueryString] = useState(queryString)

    useEffect(() => {
        const handler = setTimeout(() => {
            setQueryString(localQueryString);
        }, 500);

        return () => clearTimeout(handler);
    }, [localQueryString, setQueryString]);

    const handleClear = () => {
        setLocalQueryString('');
        setLocalQueryString('');
}
    const handleChange = (e) => {
        setLocalQueryString(e.target.value);
        setQueryString(e.target.value);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={localQueryString}
                    onChange={(e) => setLocalQueryString(e.target.value)}
                />
                <button onClick={handleClear}>Clear</button>
            </div>

            <div>
                <label>Sort Field:</label>
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="createdTime">Created Time</option>
                    <option value="title">Title</option>
                </select>

                <label>Direction:</label>
                <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
}

export default TodoListView;