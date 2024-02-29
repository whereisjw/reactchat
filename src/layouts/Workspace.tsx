import useSWR from 'swr';
import { FC, useCallback, useEffect, useState } from 'react';
import useMutation from '../hooks/useMutation';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import fetcher from '../utils/fetcher';
import gravatar from 'gravatar';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import Menu from '../components/Menu/Menu';
import { IUser } from '../typings/db';
import { Input, Label } from '../pages/Login/styles';
import Modal from '../components/Modal/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ICreateWorkspace {
  workspace: string;
  url: string;
}
const Workspace: FC = () => {
  const {
    data: getuserInfoData,
    mutate,
    isLoading,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);

  const { register, handleSubmit, reset } = useForm();
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkSpaceModal] = useState(false);
  const [mutation] = useMutation('http://localhost:3095/api/users/logout');
  const onLogoutClick = useCallback(() => {
    mutation(null);
    mutate(false, true);
  }, []);

  const onUserProfileClick = (e: any) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const navigate = useNavigate();

  const onCreateFormValid = (data: ICreateWorkspace) => {
    axios
      .post('http://localhost:3095/api/workspaces', data, { withCredentials: true })
      .catch((err) => toast.error(err.response?.data, { position: 'bottom-center' }))
      .finally(() => {
        reset();
        setShowCreateWorkSpaceModal(false);
        mutate();
      });
  };

  const onCreateWorkspaceClick = () => {
    setShowCreateWorkSpaceModal((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoading && !getuserInfoData) navigate('/login');
  }, [getuserInfoData, Navigate]);

  return (
    <div>
      <Header>
        아자아자
        <RightMenu>
          <span onClick={onUserProfileClick}>
            <ProfileImg src={gravatar.url(getuserInfoData?.email, { s: '28', d: 'retro' }, true)} alt="" />
            {showMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showMenu} onCloseModal={onUserProfileClick}>
                <ProfileModal>
                  <ProfileImg src={gravatar.url(getuserInfoData?.email, { s: '28', d: 'retro' }, true)} alt="" />
                  <div>
                    <span id="profile-name">{getuserInfoData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogoutClick}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {getuserInfoData?.Workspaces?.map((v) => (
            <Link key={v.id} to={`/workspace/${123}/channel/일반`}>
              <WorkspaceButton>{v.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          ))}
          <AddButton onClick={onCreateWorkspaceClick}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName>sleact</WorkspaceName>
          <MenuScroll>메뉴스크롤</MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} closeModal={onCreateWorkspaceClick}>
        <form onSubmit={handleSubmit(onCreateFormValid)} action="">
          <Label id="workspace-label">
            <span>워크스페이스이름</span>
            <Input id="workspace" {...register('workspace')}></Input>
          </Label>
          <Label id="workspace-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" {...register('url')}></Input>
          </Label>
          <button></button>
        </form>
      </Modal>
    </div>
  );
};

export default Workspace;
