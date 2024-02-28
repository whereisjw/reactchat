import { useForm } from 'react-hook-form';
import { Header, Form, Label, Input, Error, Button, LinkContainer } from './styles';
import useMutation from '../../hooks/useMutation';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IForm {
  email: string;
  nickname: string;
  password: string;
  password_check: string;
}

const SignUp = () => {
  const [mutation, { loading, data, error }] = useMutation('http://localhost:3095/api/users');
  console.log(data);

  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const { email, nickname, password, password_check } = data;
    if (password !== password_check) {
      return alert('비번일치하지않음!');
    }
    mutation({
      email,
      nickname,
      password,
    });
  }; //if
  useEffect(() => {
    if (data && data === 'ok') {
      alert('회원가입에 성공했습니다');
      reset();
      navigate('/login');
    }
  }, [data]);
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" {...register('email', { required: true })} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" {...register('nickname', { required: true })} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" {...register('password', { required: true })} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input type="password" id="password-check" {...register('password_check')} />
          </div>
        </Label>
        {errors.email && <Error>이메일을 입력하삼</Error>}
        {errors.email && <Error>비밀번호를 입력하삼</Error>}
        {error && <Error>사용중인아디임</Error>}
        <Button type="submit">{loading ? '로딩중...' : '회원가입'}</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
