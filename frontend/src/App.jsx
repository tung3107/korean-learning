import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { Suspense, useEffect, useState } from "react";
import Login from "./pages/User/Login";
import AppHome from "./pages/Dashboard/AppHome";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./index.css";
import MyCourse from "./pages/MyCourse/MyCourse";
import CourseDetails from "./pages/MyCourse/CourseDetails";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import Signup from "./pages/User/Signup";
import Spinner from "./components/Spinner";
import UserProfile from "./pages/User/UserProfile";
import Hihi from "./pages/Hihi";
import GlobalStyle from "./styles/GlobalStyle";
import CourseLearn from "./pages/MyCourse/CourseLearn";
import AppLearn from "./pages/MyCourse/AppLearn";
import { CourseLearnProvider } from "./hook/CourseLearnContext";
import CollectionList from "./pages/FlashCard/CollectionList";
import CollectionEdit from "./pages/FlashCard/CollectionEdit";
import CollectionCreate from "./pages/FlashCard/CollectionCreate";
import ProtectedAdmin from "./ui/ProtectedAdmin";
import AdminHome from "./pages/admin/AdminHome";
import Analysis from "./pages/admin/Analysis";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="hihi" element={<Hihi />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppHome />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="details/:slug" element={<CourseDetails />} />
              <Route path="mycourse" element={<MyCourse />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="flashcard" element={<CollectionList />} />
              <Route path="flashcard/:id" element={<CollectionEdit />} />
              <Route path="flashcard/create" element={<CollectionCreate />} />
            </Route>
            <Route
              path="learning/:slug"
              element={
                <ProtectedRoute>
                  <CourseLearnProvider>
                    <AppLearn />
                  </CourseLearnProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<CourseLearn />} />
              <Route
                path="excercise"
                element={<CourseLearn isExcercise={true} />}
              />
            </Route>
            <Route element={<ProtectedAdmin />}>
              <Route element={<AdminHome />} path="admin">
                <Route index element={<Navigate to="analysis" replace />} />
                <Route element={<Analysis />} path="analysis" />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
