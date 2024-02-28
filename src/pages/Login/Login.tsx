import { useForm } from 'react-hook-form';
import { Header, Form, Label, Input, Error, Button, LinkContainer } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const { data: getuserInfoData, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const onValidFormSubmit = (data: IForm) => {
    setLoading(true);
    axios
      .post('http://localhost:3095/api/users/login', data, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        mutate();
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (getuserInfoData) navigate('/workspace/channel');
  }, [getuserInfoData]);

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onValidFormSubmit)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" {...register('email', { required: true })} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" {...register('password', { required: true })} />
          </div>
          {errors.email && <Error>올바른 이메일을 입력하삼</Error>}
          {errors.password && <Error>올바른 비밀번호를 입력하삼</Error>}
          {/*  {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>} */}
        </Label>
        <Button type="submit">{loading ? '로딩중...' : '로그인'}</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
