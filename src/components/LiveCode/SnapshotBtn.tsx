import tw from "tailwind-styled-components";

const SnapshotFloatBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // TODO: 스냅샷 Request 날리기
  };

  return (
    <button className="accent" onClick={onClick}>
      SNAPSHOT
    </button>
  );
};

export default SnapshotFloatBtn;