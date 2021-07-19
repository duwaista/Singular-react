import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const browserLanguage = navigator.language.split('-')[0];
const resources = {
	en: {
		translation: {
			language: "Language",
			home: "Home",
			profile: "Profile",
			about: "About",
			signIn: "Sign-in",
			signUp: "Sign-up",
			logOut: "Logout",
			enter: "Enter",
			register: "Register",
			noAccount: "Don't have an account?",
			haveAccount: "Already have an account?",
			upload: "Upload",
			delete: "Delete",
			edit: "Edit",
			share: "Share"
		},
	},
	ru: {
		translation: {
			language: "Язык",
			home: "Главная",
			profile: "Профиль",
			about: "О проекте",
			signIn: "Вход",
			signUp: "Регистрация",
			logOut: "Выйти",
			enter: "Войти",
			register: "Зарегистрироваться",
			noAccount: "Нет аккаунта?",
			haveAccount: "Уже есть аккаунт?",
			upload: "Загрузить",
			delete: "Удалить",
			edit: "Редактировать",
			share: "Поделиться"
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: browserLanguage,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
