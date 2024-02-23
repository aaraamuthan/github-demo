import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { UserList } from "./components/UserList";
import { UserCard } from "./components/UserCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:username" element={<UserCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
