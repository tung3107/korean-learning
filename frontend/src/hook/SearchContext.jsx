import { createContext, useContext, useState } from "react";
import useSearch from "./useSearch";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { search, isSearchLoading } = useSearch();

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, search, isSearchLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export function useSearchResult() {
  const context = useContext(SearchContext);
  return context;
}
