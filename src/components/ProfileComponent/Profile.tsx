import React from "react";
import { useParams } from "react-router-dom";
import { IdType } from "../../types";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function ProfileComponent(): JSX.Element {
	const { id }: IdType = useParams();

	return (
		<div>
			<HeaderComponent title='Профиль' icon={true} />
			<h3 className='center'>
				<span>Profile</span>
			</h3>
			<span className='center'>{id}</span>
		</div>
	);
}
