import tw from "tailwind-styled-components";

const CompileFloatBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // TODO: 컴파일 Request 날리기 (Response data들은 props 통해 부모 컴포넌트로 전달?)
  };

  return <CompileBtn onClick={onClick}>COMPILE</CompileBtn>;
};

export default CompileFloatBtn;

const CompileBtn = tw.button`
text-center text-sm
text-neutral
font-bold
w-fit
p-2
my-auto
bg-accent
rounded-[10px]
`;
