import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {
  DashboardContainer,
  LeftDashboard,
  StyledPopup,
  StationAddress,
  List,
  GeoSearch,
  ListElement,
  ResSpace,
  Results,
  RightDashboard,
  SearchBar,
  SearchIcon,
  SearchInput,
  StationData,
  StationLayout,
  StationName,
  StationNumber,
  StationPicture,
  Stations,
  StationTag,
  Subtitle,
  Title,
  StationFinal,
  StationAva,
  StationPrice,
  GeoIcon,
} from "./Dashboard.elements";
import bg from "../../images/dummy.jpg";
import axios from "axios";

const southWest = L.latLng(36.619987291, 6.7499552751),
  northEast = L.latLng(47.1153931748, 18.4802470232),
  bounds = L.latLngBounds(southWest, northEast);

const stationIcon = L.icon({
  iconUrl: require("../../images/scooter.png").default,
  iconSize: [35, 35],
});

const userIcon = L.icon({
  iconUrl: require("../../images/user.png").default,
  iconSize: [35, 35],
});

function Dashboard() {
  const [search, setSearch] = useState("");
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState([
    41.11709353145478, 16.871847208707187,
  ]);

  useEffect(() => {
    axios
      .post("koddler-rest/api/queries/getStations.php", {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setUserLocation([position.coords.latitude, position.coords.longitude])
      );
    }
  }, []);

  const locate = () => {
    map.panTo(userLocation);
  };
  const moveToStation = (lat, lng) => {
    map.panTo([lat, lng]);
  };

  return (
    <DashboardContainer>
      <LeftDashboard>
        <Title> Dashoard </Title>
        <ResSpace>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Cerca la stazione"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <SearchIcon />
          </SearchBar>
          <List>
            <ListElement> Via Durazzo, 28 </ListElement>
            <ListElement> Stazione Lagomele </ListElement>
            <ListElement> Lorem elemento</ListElement>
            <ListElement> Ipsum elemento</ListElement>
          </List>
          <Results>
            <Subtitle> Stazioni </Subtitle>
            <StationNumber> {data.length} Stazioni Totali </StationNumber>
          </Results>

          <Stations>
            {data
              .filter((stazione) => {
                if (search == "") {
                  return stazione;
                } else if (
                  stazione.name.toLowerCase().includes(search.toLowerCase()) ||
                  stazione.address.toLowerCase().includes(search.toLowerCase())
                ) {
                  return stazione;
                }
              })
              .map((stazione) => {
                return (
                  <StationLayout
                    onClick={() => moveToStation(stazione.lat, stazione.lng)}
                  >
                    <StationPicture src={bg} />
                    <StationData>
                      {stazione.status === "on" ? (
                        <StationTag> ONLINE </StationTag>
                      ) : (
                        <StationTag hot> OFFLINE </StationTag>
                      )}

                      <StationName> {stazione.name} </StationName>
                      <StationAddress>{stazione.address}</StationAddress>
                      <StationFinal>
                        <StationAva>
                          {" "}
                          {stazione.available} su 50 monopattini disponibili{" "}
                        </StationAva>
                        <StationPrice> {stazione.price} </StationPrice>
                      </StationFinal>
                    </StationData>
                  </StationLayout>
                );
              })}
          </Stations>
        </ResSpace>
      </LeftDashboard>
      <RightDashboard>
        <MapContainer
          whenCreated={setMap}
          center={userLocation}
          maxBounds={bounds}
          attributionControl={false}
          zoom={15}
          zoomControl={false}
          maxZoom={18}
          minZoom={13}
          scrollWheelZoom={true}
          style={{
            borderRadius: "12px",
            width: "100%",
            height: "100%",
            zIndex: "0",
          }}
        >
          <TileLayer
            attribution=""
            accessToken="PyTJUlEU1OPJwCJlW1k0NC8JIt2CALpyuj7uc066O7XbdZCjWEL3WYJIk6dnXtps"
            url="https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          />

          {data.map((stazione) => {
            return (
              <Marker
                icon={stationIcon}
                position={[stazione.lat, stazione.lng]}
              >
                <StyledPopup>
                  <strong>{stazione.name}</strong>
                  <br />
                  <> {stazione.address} </>
                </StyledPopup>
              </Marker>
            );
          })}

          <Marker icon={userIcon} position={userLocation}>
            <StyledPopup>You are here.</StyledPopup>
          </Marker>
        </MapContainer>

        <GeoSearch onClick={locate}>
          <GeoIcon />
        </GeoSearch>
      </RightDashboard>
    </DashboardContainer>
  );
}

export default Dashboard;
