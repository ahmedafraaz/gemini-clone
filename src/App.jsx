import Sidebar from "./components/sidebar/Sidebar.jsx";
import Main from "./components/main/Main.jsx";

const App = () => {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
