import useSWR from 'swr';
import { FC, useCallback, useEffect } from 'react';
import useMutation from '../hooks/useMutation';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
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

const Workspace: FC = () => {
  const { data: getuserInfoData, mutate, isLoading } = useSWR('http://localhost:3095/api/users', fetcher);
  const [mutation] = useMutation('http://localhost:3095/api/users/logout');
  const onLogoutClick = useCallback(() => {
    mutation(null);
    mutate(false, true);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !getuserInfoData) navigate('/login');
  }, [getuserInfoData, Navigate]);

  return (
    <div>
      <Header>
        아자아자
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(getuserInfoData?.email, { s: '28', d: 'retro' }, true)} alt="" />
          </span>
        </RightMenu>
        {/*         <LogOutButton onClick={onLogoutClick}>로그아웃</LogOutButton> */}
      </Header>

      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>sleact</WorkspaceName>
          <MenuScroll>메뉴스크롤</MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
