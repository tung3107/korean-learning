import { NavLink } from "react-router-dom";
import Img from "../components/Img";
import Spinner from "../components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchResult } from "../hook/SearchContext";
import SpinnerMini from "./SpinnerMini";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  top: 3rem;
  margin-top: 2rem;
  width: 420px;
  background-color: white;
  box-shadow: 4px -4px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  animation: fadeInUp 0.25s ease-out;

  @media (max-width: 728px) {
    width: 190px;
  }
`;

function SearchResult({ menuRef, handleSearch }) {
  const queryClient = useQueryClient();
  const searchResult = queryClient.getQueryData(["searchResult"]);
  const { searchQuery, isSearchLoading } = useSearchResult();

  return (
    <MenuContainer ref={menuRef} className="searchMenu">
      <div className="text-gray-700">
        {isSearchLoading ? (
          <div className="flex items-center gap-2">
            <SpinnerMini style={{ width: "15px", height: "15px" }} />
            Searching for &quot;{searchQuery}&quot;...
          </div>
        ) : searchResult?.length > 0 ? (
          <div>
            <div className="flex flex-row gap-2 text-grey mb-2">
              <Img
                src="/Search.svg"
                styled={{
                  width: "15px",
                }}
              />
              Search result for &quot;{searchQuery}&quot;
            </div>
            {searchResult.map((el) => (
              <div
                key={el._id}
                className="flex items-center gap-3 py-2 border-b"
              >
                <Img
                  src={`${import.meta.env.VITE_BACKEND_URL}/img/course/${
                    el.cover_photo
                  }`}
                  styled={{
                    borderRadius: "50%",
                    width: "2em",
                    height: "2em",
                    objectFit: "cover",
                  }}
                />
                <NavLink
                  to={`/app/details/${el.slug}`}
                  className="text-blue-600"
                  onClick={handleSearch}
                >
                  {el.name}
                </NavLink>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-row gap-2 text-grey mb-2">
              <Img
                src="/Search.svg"
                styled={{
                  width: "15px",
                }}
              />
              No results found for &quot;{searchQuery}&quot;.
            </div>
          </div>
        )}
      </div>
    </MenuContainer>
  );
}

export default SearchResult;
