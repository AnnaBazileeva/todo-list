import {useEffect, useState} from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 1rem;`

const StyledRow = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;`

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;`

const StyledButton = styled.button`
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;`

const StyledLabel = styled.label`
  margin-right: 0.25rem;`

const StyledSelect = styled.select`
  padding: 0.25rem 0.5rem;`

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
}
return (
        <StyledWrapper>
            <StyledRow>
                <StyledInput
                    type="text"
                    placeholder="Search todos..."
                    value={localQueryString}
                    onChange={(e) => setLocalQueryString(e.target.value)}
                />
                <StyledButton onClick={handleClear}>Clear</StyledButton>
            </StyledRow>

            <StyledRow>
                <StyledLabel>Sort Field:</StyledLabel>
                <StyledSelect value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="createdTime">Created Time</option>
                    <option value="title">Title</option>
                </StyledSelect>

                <StyledLabel>Direction:</StyledLabel>
                <StyledSelect value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </StyledSelect>
            </StyledRow>
        </StyledWrapper>
    );
}

export default TodoListView;