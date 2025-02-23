import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../../ui/AppHeader";
import { HomeCourseLayout } from "../../ui/HomeCourse";
import {
  HiArrowLeftOnRectangle,
  HiDocument,
  HiOutlineTrash,
  HiPlusCircle,
} from "react-icons/hi2";
import { DashboardLayout } from "../Dashboard/Dashboard";
import axiosClient from "../../services/axiosClient";
import toast from "react-hot-toast";

const CollectionEditLayout = DashboardLayout;

const EditLayout = styled(HomeCourseLayout)`
  svg:hover {
    color: #ff9800;
    cursor: pointer;
  }
  hr {
    border-top: 2px solid lightgrey;
  }
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

function CollectionEdit() {
  const [flashCardDataList, setFlashCardDataList] = useState([]);
  const [flashCardDetail, setFlashCardDetail] = useState({
    name: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollection() {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/collection/${id}`);
        setFlashCardDataList(response.data.data.doc.flashcards || []);
        setFlashCardDetail({
          name: response.data.data.doc.name || "",
          description: response.data.data.doc.description || "",
        });
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollection();
  }, [id]);

  function handleAdd() {
    setFlashCardDataList([...flashCardDataList, { front: "", back: "" }]);
  }

  function handleRemove(index) {
    setFlashCardDataList(flashCardDataList.filter((_, i) => i !== index));
  }

  function handleOnChangeCard(e) {
    setFlashCardDetail({ ...flashCardDetail, [e.target.name]: e.target.value });
  }

  function handleOnChange(index, field, value) {
    const editCardList = [...flashCardDataList];
    editCardList[index][field] = value;
    setFlashCardDataList(editCardList);
  }
  async function onSave() {
    setIsSaving(true);
    try {
      const response = await axiosClient.patch(`/collection/${id}`, {
        collection: flashCardDetail,
        flashcards: flashCardDataList,
      });
      if (response.status === 200) {
        toast.success("Create successfully");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <CollectionEditLayout>
      <AppHeader />
      <EditLayout>
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <HiArrowLeftOnRectangle
              size={30}
              onClick={() => navigate(-1)}
              className="cursor-pointer hover:text-gray-500"
            />
            <h2 className="text-2xl font-bold text-black">Edit Collection</h2>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={onSave}
            disabled={isSaving}
          >
            <HiDocument />
            Save
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Title for collection
          </label>
          <input
            type="text"
            name="name"
            value={flashCardDetail.name}
            onChange={handleOnChangeCard}
            placeholder="Enter your title"
            className="border border-gray-300 rounded-md px-4 py-2 focus:border-green-500 w-full"
          />

          <label className="block text-gray-700 font-medium mt-4 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={flashCardDetail.description}
            onChange={handleOnChangeCard}
            placeholder="Enter your description"
            className="border border-gray-300 rounded-md px-4 py-2 focus:border-green-500 w-full"
          />
        </div>

        {/* Quick Add Button */}
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-6"
          onClick={handleAdd}
        >
          <HiPlusCircle />
          Quick add
        </button>

        {/* Card */}
        {flashCardDataList.map((el, i) => (
          <Card
            key={i}
            index={i + 1}
            el={el}
            handleOnChange={handleOnChange}
            handleRemove={handleRemove}
          />
        ))}
      </EditLayout>
    </CollectionEditLayout>
  );
}

function Card({ index, el, handleOnChange, handleRemove }) {
  const [newErrors, setNewErrors] = useState({});

  useEffect(() => {
    function handleErrors() {
      const errors = {};
      if (el.front === "") {
        errors["front"] = "This field is required";
      }
      if (el.back === "") {
        errors["back"] = "This field is required";
      }
      setNewErrors(errors);
    }
    handleErrors();
  }, [el.back, el.front]);

  return (
    <div className="bg-green-50 p-4 rounded-md w-full md:w-4/5">
      <div className="flex justify-between items-center font-bold text-gray-700">
        <span>{index}</span>
        <HiOutlineTrash
          size={20}
          className="text-red-500 cursor-pointer"
          onClick={() => handleRemove(index - 1)}
        />
      </div>
      <hr className="my-2 border-gray-300" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Front</label>
          <input
            type="text"
            name="front"
            value={el.front}
            onChange={(e) => handleOnChange(index - 1, "front", e.target.value)}
            className="border border-green-500 rounded-md px-4 py-2 focus:border-green-600 w-full"
          />
          {newErrors.front && (
            <p className="text-red-500 text-sm mt-1">{newErrors.front}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Back</label>
          <input
            type="text"
            name="back"
            value={el.back}
            onChange={(e) => handleOnChange(index - 1, "back", e.target.value)}
            className="border border-green-500 rounded-md px-4 py-2 focus:border-green-600 w-full"
          />
          {newErrors.back && (
            <p className="text-red-500 text-sm mt-1">{newErrors.back}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionEdit;
