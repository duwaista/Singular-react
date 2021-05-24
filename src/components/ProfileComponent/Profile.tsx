import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppState } from "../../store/store";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function ProfileComponent(): JSX.Element {
	const logged: boolean = useSelector((state: AppState) => state.user.logged);

	return (
		<div>
			<HeaderComponent title='Профиль' icon={true} />
			<h3>
				<span>Profile</span>
			</h3>
			{!logged && <Redirect to='/'></Redirect>}
		</div>
	);
}
