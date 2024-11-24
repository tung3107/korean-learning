import Input from "../ui/Input";
import styled from "styled-components";

const SearchLayout = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgb(232, 232, 232);
  padding: 0 16px 0 8px;
  width: 420px;
  max-width: 100%;
  height: 40px;
  gap: 5px;
  animation: fadeInUp 1s ease forwards;
`;

function Search({ children }) {
  return <SearchLayout>{children}</SearchLayout>;
}

export default Search;
