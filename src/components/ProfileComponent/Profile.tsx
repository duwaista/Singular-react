import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../store/store";
import { IdType } from "../../types";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function ProfileComponent(): JSX.Element {
	const { id }: IdType = useParams();
	const currentUser = useSelector((state: AppState) => state.user.profile);

	// useEffect(() => {

	// }, []);

	return (
		<>
			<HeaderComponent title='Профиль' icon={true} />
			<img
				alt='User avatar'
				src='https://sun9-6.userapi.com/impg/P-rSyyZDHttn6GAXDqtBYYLPY9crqOBzPk6tYw/pAUoGdRJLxo.jpg?size=256x256&quality=96&sign=79a38587d2c1a7b3bfa08954a07f5ec7&type=album'
			/>
			<span className='center'>{id}</span>
		</>
	);
}
