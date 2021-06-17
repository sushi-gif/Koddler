import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { SiTelegram } from "react-icons/si";
import { Popup } from "react-leaflet";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const LeftDashboard = styled.div`
  flex: 1;
`;

export const RightDashboard = styled.div`
  width: 60%;
  padding: 1rem;
  height: 100%;
  position: relative;

  @media screen and (max-width: 1074px) {
    width: 100%;
    height: 250px;
  }
`;

export const Title = styled.h4`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 1.75rem;
  margin: 0;
  padding: 24px 32px;
  border-bottom: 2px solid #e7e9ec;
`;

export const ResSpace = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const Subtitle = styled.h4`
  font-weight: bold;
  font-weight: 700;
  line-height: 1.125;
  font-size: 1.5rem;
  margin: 0;
  padding: 28px 0;
`;

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
  border-radius: 14px;
  padding: 1rem;
  background-color: #f5f8ff;
`;

export const SearchInput = styled.input`
  outline: none;
  height: 100%;
  border: none;
  margin-right: 1rem;
  background-color: transparent;
  font-weight: bold;
  flex: 1;
`;

export const SearchIcon = styled(ImSearch)``;

export const List = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const ListElement = styled.div`
  font-size: 13px;
  color: #8e99c7;
  font-weight: bold;
  padding: 8px 14px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  background-color: #f5f8ff;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const StationNumber = styled.h4`
  margin: 0;
  color: #999;
  font-size: 1.2rem;
  padding: 28px 0;
  margin-left: 15px;
`;

export const Results = styled.div`
  display: flex;
  align-items: center;
`;

export const StationLayout = styled.div`
  display: flex;
  margin: 24px 0px;

  &:first-child {
    margin-top: 0;
  }
`;

export const StationPicture = styled.img`
  border-radius: 12px;
  width: 20%;
  max-height: 100%;
  height: auto;
  margin-right: 24px;
  object-fit: cover;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const StationData = styled.div`
  flex: 1;
  height: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f9;
`;

export const Stations = styled.div``;

export const StationTags = styled.div`
  display: flex;
`;

export const StationTag = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  padding: 6px 25px;
  border-radius: 12px;
  width: fit-content;
  background-color: ${({ hot }) => (hot ? "#246ffe" : "#ffc148")};
`;

export const StationName = styled.h4`
  line-height: 1.125;
  font-size: 1.2rem;
  margin: 0;
  color: #2f3954;
  padding: 16px 0;
  padding-bottom: 8px;
`;

export const StationAddress = styled.h4`
  color: #a5aed3;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
`;

export const StationFinal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StationAva = styled.p`
  color: #efe9f5;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 12px;
`;

export const StationPrice = styled.p`
  color: #000;
  font-weight: bold;
  margin: 0;
  padding: 0;

  &::before {
    content: "€";
  }

  &::after {
    content: " / hour";
    font-weight: 100;
    color: #a5aed3;
    font-size: 10px;
  }
`;

export const GeoSearch = styled.div`
  position: absolute;
  bottom: 50px;
  padding: 15px;
  cursor: pointer;
  border-radius: 22px;
  background-color: #2a344f;
  right: 40px;
  display: flex;
  justify-content: center;
`;

export const GeoIcon = styled(SiTelegram)`
  display: flex;
  align-self: center;
  font-size: 1.25rem;
  color: #fff;
`;

export const StyledPopup = styled(Popup)`
  background-color: red;
  border-radius: 0;
  .leaflet-popup-content-wrapper {
    border-radius: 0;
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;
