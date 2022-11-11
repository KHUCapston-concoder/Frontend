import tw from "tailwind-styled-components";

const CompileFloatBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // TODO: 컴파일 Request 날리기 (Response data들은 props 통해 부모 컴포넌트로 전달?)
  };

  return <button className="accent" onClick={onClick}>COMPILE</button>;
};

export default CompileFloatBtn;
