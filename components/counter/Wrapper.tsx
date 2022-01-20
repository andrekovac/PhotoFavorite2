import styled from 'styled-components/native';

type WrapperProps = {
  title: string;
};

const Wrapper: React.FC<WrapperProps> = ({ title, children }) => {
  return (
    <Outer>
      <Title>{title}</Title>
      {children}
    </Outer>
  );
};

const Title = styled.Text`
  position: absolute;
  bottom: 5px;
  left: 5px;
  font-weight: bold;
`;

const Outer = styled.View`
  border: 3px solid black;
  border-radius: 10px;
  width: 90%;
  margin: 10px 0;
  padding: 10px;
  align-items: center;
`;

export default Wrapper;
