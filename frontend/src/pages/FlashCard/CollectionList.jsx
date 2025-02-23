import React from "react";
import { HiClipboardDocument, HiEye, HiPlusCircle } from "react-icons/hi2";
import { useNavigate } from "react-router";
import AppHeader from "../../ui/AppHeader";
import { DashboardLayout } from "../Dashboard/Dashboard";
import { HomeCourseLayout } from "../../ui/HomeCourse";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../services/axiosClient";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner";

const CollectionListLayout = DashboardLayout;
const CollectionContentLayout = HomeCourseLayout;

const CollectionList = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    data: collections,
    error,
  } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => {
      const response = await axiosClient.get("/collection");
      return response.data.data.docs;
    },
    staleTime: 3 * 1000,
  });

  return (
    <CollectionListLayout>
      <AppHeader />
      <CollectionContentLayout>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            My FlashCard Collection
          </h2>
          <NavLink
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            to="create"
          >
            <HiPlusCircle size={20} /> Add new collection
          </NavLink>
        </div>

        {/* Grid Collection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && collections ? (
            collections?.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {collection.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1">
                    <HiClipboardDocument size={18} />
                    {collection.flashcards.length} words
                  </span>
                  <button
                    onClick={() => navigate(`/app/flashcard/${collection.id}`)}
                    className="flex items-center gap-1 text-white px-2 rounded-xl cursor-pointer py-1 bg-green-600 transition"
                  >
                    View <HiEye size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </CollectionContentLayout>
    </CollectionListLayout>
  );
};

export default CollectionList;
