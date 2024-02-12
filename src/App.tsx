import React from "react";
import { UsersList } from "./components/UsersList/UsersList";
import { Route, Routes } from "react-router-dom";
import { UserInfo } from "./components/UserInfo/UserInfo";
import { PostList } from "./components/PostList/PostList";
import { AlbumsList } from "./components/AlbumsList/AlbumsList";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />}>
        <Route path=":userId" element={<UserInfo />}>
          <Route path="posts" element={<PostList />} />
          <Route path="albums" element={<AlbumsList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
