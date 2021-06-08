import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Profile.css";
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
			<div className='user-profile-info-container'>
				<img
					className='user-profile-avatar'
					alt='User avatar'
					src='https://sun9-6.userapi.com/impg/P-rSyyZDHttn6GAXDqtBYYLPY9crqOBzPk6tYw/pAUoGdRJLxo.jpg?size=256x256&quality=96&sign=79a38587d2c1a7b3bfa08954a07f5ec7&type=album'
				/>
				<div className='user-profile-info'>
					<span className='user-profile-email'>{currentUser.email}</span>
					<div className='user-edit-profile-button'>
						<span>Редактировать</span>
					</div>
				</div>
				<div className='profile-bottom-line'></div>
			</div>
		</>
	);
}
