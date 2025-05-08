

function  TodosViewForm({sortDirection, setSortDirection, sortField, setSortField}) {
    const preventRefresh = (e) => {
        e.preventDefault();
    };


    return (
   <div>
           <form onSubmit={preventRefresh}>
               <label htmlFor="sortSelect">Sort by</label>
                 <select id="sortSelect" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                   <option value="title">Title</option>
                   <option value="createdTime">Time added</option>
                 </select>
               <label htmlFor="directionSelect">Direction</label>
               <select
                   id="directionSelect"
                   value={sortDirection}
                   onChange={(e) => setSortDirection(e.target.value)}
               >
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
               </select>
       </form>
   </div>
    )
}
export default TodosViewForm