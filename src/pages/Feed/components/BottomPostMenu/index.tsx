import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import deleteIcon from "../../../../assets/icons/delete.svg";
import share from "../../../../assets/icons/share-variant.svg";
import edit from "../../../../assets/icons/edit.svg";

import { actions, AppState, deletePostFetch } from "../../../../store/store";
import BasicElementBottom from "../../../../components/BasicComponents/BasicElementBottom/BasicElementBottom";
import BottomMenuComponent from "../../../../components/BottomMenuComponent/BottomMenuComponent";
import useAppSelector from "../../../../hooks/useAppSelector";

const BottomPostMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const showBottomMenu = useSelector((state: AppState) => state.boolshit.bottomMenu);
  const currentPost = useSelector((state: AppState) => state.feed.currentPost);

  const { profile, isLogged } = useAppSelector((state) => state.user);
  const userIsOwner = profile?.uid === currentPost.feed.uid;

  const handleClose = () => {
    dispatch(actions.BoolShit.changeBottomMenu(false));
  };

  const sharePic = async () => {
    const shareData = {
      url: currentPost.feed.posts,
    };
    try {
      await navigator.share(shareData);
    } catch (e) {
      console.log(e);
    }
  };

  const editPost = () => {
    console.log("NO");
  };

  const deletePost = () => {
    if (!isLogged) return;
    dispatch(deletePostFetch({ currentPost }));
  };

  return (
    <BottomMenuComponent
      showMenu={showBottomMenu}
      onClose={handleClose}
    >
      {userIsOwner && isLogged && (
        <>
          <BasicElementBottom
            onClick={deletePost}
            text={t("delete")}
            icon={deleteIcon}
          />
          <BasicElementBottom
            onClick={editPost}
            text={t("edit")}
            icon={edit}
          />
        </>
      )}
      <BasicElementBottom
        text={t("share")}
        icon={share}
        onClick={sharePic}
      />
    </BottomMenuComponent>
  );
};

export default BottomPostMenu;
