import tw from "tailwind-styled-components";

const SnapshotFloatBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // TODO: 스냅샷 Request 날리기
  };

  return <SnapBtn onClick={onClick}>SNAPSHOT</SnapBtn>;
};

export default SnapshotFloatBtn;

const SnapBtn = tw.button`
text-center text-sm
text-neutral
font-bold
w-fit
p-2
my-auto
bg-accent
rounded-[10px]
`;
