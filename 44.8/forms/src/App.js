import logo from "./logo.svg";
import "./App.css";
import BoxList from "./props/boxlist";
import TodoList from "./props/todolist";

function App() {
	return (
		<div className="App">
			<BoxList />
			<TodoList />
		</div>
	);
}

export default App;
