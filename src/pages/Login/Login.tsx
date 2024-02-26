import { useForm } from 'react-hook-form';
import { Header, Form, Label, Input, Error, Button, LinkContainer } from './styles';
import useMutation from '../../hooks/useMutation';
import { Link } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IForm>();
  const [mutation, { loading, data, error }] = useMutation('http://localhost:3095/api/users/login');
  const onValidFormSubmit = (data: IForm) => {
    mutation(data);
  };
  console.log(data);

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onValidFormSubmit)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" {...register('email')} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" {...register('password')} />
          </div>
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
