import React, { useState } from "react";

const Todo = ({ id, task, remove, update }) => {
	const [editTask, setEditTask] = useState(task);
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		setIsEditing((edit) => !edit);
	};

	const handleChange = (evt) => {
		setEditTask(evt.target.value);
	};

	const handleDelete = () => remove(id);

	const handleUpdate = (evt) => {
		evt.preventDefault();
		update(id, editTask);
		setIsEditing(false);
	};

	// default todo view
	let jsx = (
		<div>
			<li>{task}</li>
			<button onClick={toggleEdit}>edit</button>
			<button onClick={handleDelete}>X</button>
		</div>
	);

	// todo view when editing
	if (isEditing) {
		jsx = (
			<div>
				<form onSubmit={handleUpdate}>
					<input
						type="text"
						value={editTask}
						onChange={handleChange}
					/>
					<button>update</button>
				</form>
			</div>
		);
	}

	return jsx;
};

export default Todo;
