import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import AlgoFilterContainer from "@/components/AlgoProblem/AlgoFilter";
import AlgoInfo from "@/components/AlgoProblem/AlgoInfo";
import TestCaseList from "@/components/TestCase/TestCaseList";
import CompileInfo from "@/components/Compile/CompileInfo";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import LiveCode from "@/components/LiveCode/LiveCode";
import useFetchAlgoInfo from "@/hooks/Components/useFetchAlgoInfo";
import ChatBox from "@/components/Chat/ChatBox";
import Modal from "@/hoc/Portal";
import useModal from "@/hooks/useModal";
import SnapshotBtn from "@/components/Snapshot/PopupBtn";
import TimerBtn from "@/components/Timer/PopupBtn";
import { IconButton } from "@/components/_styled/Buttons";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import CamList from "@/components/Cam/CamList";
import Toast from "@/components/_styled/Toast";
import WebSocketContext from "@/context/WebSocketContext";

const Workspace = () => {
  const [sendRequestProbLevel, sendRequestProbCategory] = useFetchAlgoInfo();
  const [isModalOpen, setIsModalOpen, onClickExit] = useModal();
  const navigator = useNavigate();

  useEffect(() => {
    sendRequestProbLevel();
    sendRequestProbCategory();
  }, []);

  const exitWorkspace = () => {
    navigator("/home");
    localStorage.removeItem("workspace-id");
  };

  return (
    <>
      <WebSocketContext>
        <MainDiv>
          {/* Section 1 */}
          <AlgoDiv>
            <AlgoFilterDiv>
              <AlgoFilterContainer />
            </AlgoFilterDiv>
            <AlgoInfoDiv>
              <AlgoInfo />
            </AlgoInfoDiv>
          </AlgoDiv>
          {/* Section 2 */}
          <CodeDiv>
            <LiveCode />
          </CodeDiv>
          {/* Section 3 */}
          <FlexDiv>
            {/* 컴파일 정보 */}
            <CompileInfoDiv>
              <CompileInfo />
            </CompileInfoDiv>
            {/* 테스트 케이스 */}
            <TestCasaeDiv>
              <TestCaseList />
            </TestCasaeDiv>
            {/* 아래 버튼 3개 */}
            <UtilButtonsDiv>
              <UtilButtonDiv>
                <SnapshotBtn />
              </UtilButtonDiv>
              <UtilButtonDiv>
                <TimerBtn />
              </UtilButtonDiv>
              <UtilButtonDiv>
                <IconButton
                  name="circle-xmark"
                  size="lg"
                  onClick={onClickExit}
                />
              </UtilButtonDiv>
            </UtilButtonsDiv>
          </FlexDiv>
          {/* Section 4 */}
          <FlexDiv2>
            <CamDiv>
              <CamList />
            </CamDiv>
            <ChatDiv>
              <ChatBox />
            </ChatDiv>
          </FlexDiv2>
        </MainDiv>
        <Modal
          className="h-[20%] w-[20%] min-w-[200px] max-w-[900px]"
          isShowing={isModalOpen}
          close={() => setIsModalOpen(false)}
        >
          <FlexDiv3>
            <FlexDiv4>종료하시겠습니까?</FlexDiv4>
            <FlexDiv4 className="justify-end">
              <ExitButton
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  padding: "5px 20px",
                }}
                onClick={exitWorkspace}
              >
                종료
              </ExitButton>
            </FlexDiv4>
          </FlexDiv3>
        </Modal>
        <Toast />
      </WebSocketContext>
    </>
  );
};

export default Workspace;

/* 기본 */
const CommonDiv = tw.div`
ml-[15px] my-[15px]
rounded-[20px] basis-[100px]
bg-[#222831]
`;

const MainDiv = tw.div`
w-full min-w-[1000px] h-full
flex
overflow-hidden
dark-1
`;

const FlexDiv = tw(CommonDiv)`
grow-[2] flex flex-col
bg-inherit
`;

const FlexDiv2 = tw(CommonDiv)`
grow h-[calc(100%-30px)]
mr-[15px]
flex flex-col gap-[15px]
bg-inherit
`;

const FlexDiv3 = tw.div`
h-full
flex flex-col
justify-center items-center
py-[5%]
`;

const FlexDiv4 = tw.div`
w-full h-1/2 flex items-end justify-center
`;

/* 3.4.1 실시간 화상 회의 */
const CamDiv = tw.div`
dark-2
w-full h-[300px] min-h-[300px]
rounded-[20px]
`;

/* 3.4.7 채팅 */
const ChatDiv = tw.div`
w-full h-[calc(100%-320px)]
rounded-[20px]
`;

/* 3.4.4 알고리즘 문제 추천 */
const AlgoDiv = tw(CommonDiv)`
grow-[2] bg-inherit
`;

const AlgoFilterDiv = tw(CommonDiv)`
m-0
h-[20%]
bg-inherit
`;

const AlgoInfoDiv = tw(CommonDiv)`
m-0 mt-[15px]
h-[calc(80%-15px)]
`;

/* 3.4.2 실시간 동시 코딩 */
const CodeDiv = tw(CommonDiv)`
grow-[6] bg-[#1E1E1E]
`;

/* 3.4.5 컴파일 정보 */
const CompileInfoDiv = tw(CommonDiv)`
m-0 mb-[15px] dark-1
w-full h-[20%]
basis-auto
`;

/* 3.4.6 테스트 케이스 */
const TestCasaeDiv = tw(CommonDiv)`
m-0 mb-[15px] dark-1
w-full h-[80%] min-h-[420px]
basis-auto
`;

/* 부가기능 버튼들 */
const UtilButtonsDiv = tw(CommonDiv)`
m-0 w-full
min-h-[60px] h-[10%]
flex gap-[10px] justify-end items-end
bg-inherit
`;

const UtilButtonDiv = tw(CommonDiv)`
m-0
max-w-[60px]
h-[60px] w-[60px]
`;

const ExitButton = tw.button`
accent m-[10px] px-[10px]
`;
