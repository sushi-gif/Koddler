import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaQuestionCircle } from "react-icons/fa";

export const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const HelpMenu = styled.div`
  flex: 1;
  padding: 2rem;
`;

export const ContactForm = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgb(248, 248, 248);
  padding: 2rem 4rem;
`;

export const ContactFormWrapper = styled.div`
  width: 30%;

  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h2`
  color: #464562;
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 36px;
  margin: 0;
  padding: 16px 0px;
`;

export const FormSubtitle = styled.h2`
  color: #9b9ba8;
  font-size: 18px;
  margin: 0;
  padding: 0;
  font-weight: normal;
`;

export const CForm = styled.form`
  margin: 92px 0px;
`;

export const Step = styled.h5`
  margin: 0;
  margin-top: 32px;
  color: #d1d0d7;
  font-size: 14px;
  font-weight: bold;
  padding: 0;

  &:first-child {
    margin-top: 0;
  }
`;

export const StepSub = styled.h5`
  color: #737577;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const StepInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  outline: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  margin: 0.5rem 0px;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  transition: all 0.2s ease-in 0s;
  border: 1px solid rgba(0, 0, 0, 0.075);
  font-family: inherit;
`;

export const StepTextArea = styled.textarea`
  width: 100%;
  height: 120px;
  background-color: #f8f8f8;
  outline: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  margin: 0.5rem 0px;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  transition: all 0.2s ease-in 0s;
  border: 1px solid rgba(0, 0, 0, 0.075);
  resize: none;
  font-family: inherit;
`;

export const GoBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  margin: 48px 0px;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 9px -15px;
  border-radius: 8px;
  background-color: #613cea;
  color: rgb(255, 255, 255);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in 0s;
  font-family: inherit;
`;

export const Subtitle = styled.h4`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
`;

export const List = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const ListElement = styled(NavLink)`
  font-size: 13px;
  color: #4b4e61;
  font-weight: bold;
  padding: 8px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  background-color: transparent;

  &:hover {
    background-color: rgb(248, 248, 248);
  }

  &.active {
    background-color: rgb(248, 248, 248);
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 1.75rem;
  margin: 0;
  padding: 24px 32px;
  border-bottom: 2px solid #e7e9ec;
`;

export const AssistanceContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const ComponentContainer = styled.div`
  width: 100%;
  padding: 2rem;
  border-top: 2px solid #e7e9ec;
  max-width: 100%;
`;

export const ListElementTitle = styled.div`
  color: #000;
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
`;

export const ListElementSubTitle = styled.div`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 24px;
  padding-top: 16px;
`;

export const ResImg = styled.img`
  margin: 16px 0px;
  width: 100%;
`;

export const FaqContainer = styled.div`
  width: 100%;
  border-radius: 3px;
  background-color: #f8f9fa;
  padding: 1.25rem;
  margin: 2rem 0;
  display: flex;
`;

export const FaqIcon = styled(FaQuestionCircle)`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 8px;
  color: #613cea;
  padding: 10px;
  margin: 0;
  margin-top: -10px;
  cursor: pointer;
`;

export const FaqQuestion = styled.h4`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 16px;
  margin: 0;
  padding-bottom: 0;
`;

export const FaqInfo = styled.div`
  flex: 1;
`;
