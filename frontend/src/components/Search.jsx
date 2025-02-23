import Input from "../ui/Input";
import styled from "styled-components";
import Img from "./Img";
import { useEffect, useState } from "react";
import useSearch from "../hook/useSearch";
import { useSearchResult } from "../hook/SearchContext";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchLayout = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgb(232, 232, 232);
  padding: 0 16px 0 8px;
  background-color: rgb(225, 225, 225);
  width: 420px;
  max-width: 100%;
  height: 40px;
  gap: 5px;
  // animation: fadeInUp 1s ease forwards;

  svg {
    width: 1.5rem;
  }

  @media (max-width: 728px) {
    width: 100%;
  }
  input {
    background-color: rgb(225, 225, 225);
  }
`;

function Search({ handleSearch }) {
  const { search, searchQuery, setSearchQuery } = useSearchResult();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (searchQuery.length > 3) {
        search(searchQuery); // Gọi API khi query dài hơn 3 ký tự
      }
    }, 600);

    // Dọn dẹp timeout trước khi chạy effect tiếp theo
    return () => clearTimeout(timeoutID);
  }, [searchQuery, search]);
  return (
    <SearchLayout>
      <HiOutlineMagnifyingGlass />
      <Input
        type="text"
        id="search"
        value={searchQuery}
        placeholder="Search courses, exercises,..."
        className="w-full h-full focus:outline-none search"
        onClick={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoComplete="off"
      />
    </SearchLayout>
  );
}

export default Search;
