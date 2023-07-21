import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue = []) => {
	if (localStorage.getItem(key)) {
		initialValue = JSON.parse(localStorage.getItem(key));
	}
	const [value, setValue] = useState(initialValue);
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);
	return [value, setValue];
};

export default useLocalStorage;
