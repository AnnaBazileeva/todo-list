

function  TodosViewForm({sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString}) {

    const handleSortChange = (e) => {
        setSortField(e.target.value);
    };

    const handleDirectionChange = (e) => {
        setSortDirection(e.target.value);
    };

    const handleSearchChange = (e) => {
        setQueryString(e.target.value);
    };

    const clearSearch = () => {
        setQueryString('');
    };

    const preventRefresh = (e) => {
        e.preventDefault();
    };


    return (
   <form onSubmit={preventRefresh}>
       <div>
           <label htmlFor="todosSearch">Search todos</label>
           <input type="text"
                  value={queryString}
                  onChange={handleSearchChange}
           />
           <button type='button' onClick={clearSearch}>Clear</button>
       </div>
       <div>
               <label htmlFor="sortSelect">Sort by</label>
                 <select id="sortSelect" value={sortField} onChange={handleSortChange}>
                   <option value="title">Title</option>
                   <option value="createdTime">Time added</option>
                 </select>
               <label htmlFor="directionSelect">Direction</label>
               <select
                   id="directionSelect"
                   value={sortDirection}
                   onChange={handleDirectionChange}
               >
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
              </select>
       </div>
</form>

    )
}
export default TodosViewForm