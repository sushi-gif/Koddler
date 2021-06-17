import React from "react";
import styled from "styled-components";
import { ImFilesEmpty } from "react-icons/im";
import { NavLink } from "react-router-dom";

const Area = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AreaInfo = styled.div`
  text-align: center;
`;

const AreaIcon = styled(ImFilesEmpty)`
  font-size: 4rem;
  color: rgb(88, 82, 128);
`;

const AreaDesc = styled.h3`
  margin: 50px;
`;

const AreaButton = styled(NavLink)`
  width: 60%;
  height: 40px;
  border: none;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 9px -15px;
  border-radius: 8px;
  background-color: rgb(42, 52, 79);
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
  padding: 0.8rem 2rem;
  transition: all 0.2s ease-in 0s;
`;

const EmptyArea = () => {
  return (
    <Area>
      <AreaInfo>
        <AreaIcon />
        <AreaDesc> Nulla da vedere qui. </AreaDesc>
        <AreaButton to="/dashboard"> Vai alla Home </AreaButton>
      </AreaInfo>
    </Area>
  );
};

export default EmptyArea;
