import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface PropType {
  mine?: boolean;
}

const ChatBubble = ({ mine = false }: PropType) => {
  return (
    <>
      {mine ? (
        <>
          <NicknameHolder className="text-right">
            나 (깜찍한 고양이)
          </NicknameHolder>
          <FlexDiv1>
            <BubbleDiv>
              국회의원과 정부는 법률안을 제출할 수 있다. 국가유공자·상이군경 및
              전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의
              기회를 부여받는다.
            </BubbleDiv>
            <TimeHolder>11:20</TimeHolder>
          </FlexDiv1>
        </>
      ) : (
        <>
          <NicknameHolder>귀여운 오소리</NicknameHolder>
          <FlexDiv2>
            <BubbleDiv>
              국회의원과 정부는 법률안을 제출할 수 있다. 국가유공자·상이군경 및
              전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의
              기회를 부여받는다.
            </BubbleDiv>
            <TimeHolder>11:20</TimeHolder>
          </FlexDiv2>
        </>
      )}
    </>
  );
};

const NicknameHolder = tw.div`
text-[11px] font-bold
`;

const FlexDiv = tw.div`
flex items-end
mx-[5px] mt-[2px] mb-[10px]
`;

const FlexDiv1 = tw(FlexDiv)`
justify-flex-end flex-row-reverse
`;

const FlexDiv2 = tw(FlexDiv)`
`;

const TimeHolder = tw.span`
px-[5px] text-[5px] text-base-200
`;

const BubbleDiv = tw.div`
    w-[100px] h-fit min-h-[40px]
    bg-neutral 
    rounded-[5px]
    px-[8px] py-[5px]
    text-[10px]
    break-words
`;

export default ChatBubble;
