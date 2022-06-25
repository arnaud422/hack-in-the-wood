import React, { useEffect, useState } from "react";
import TransportBtn from "../transportButton";
import "../style/adapt.css";

const Adapt = () => {
  const [arret, setArret] = useState();
  const [userPosition, setUserPosition] = useState();
  const [dist, setDist] = useState();
  const [transport, setTransport] = useState(true);

  const arrets = {
    stops: [
      { name: "Tente fond", Latitude: 50.601759, Longitude: 3.510466 },
      { name: "Maker Lab", Latitude: 50.601767, Longitude: 3.510722 },
      { name: "Point info", Latitude: 50.601324, Longitude: 3.511161 },
      { name: "Entrée", Latitude: 50.601096, Longitude: 3.511567 },
    ],
  };

  function handleTransport() {
    setTransport(!transport);
  }

  function distance(lat1, lon1, lat2, lon2) {
    var R = 6378.137;
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.floor(d * 1000);
  }

  const vibrate = (distance) => {
    setInterval(window.navigator.vibrate(200), distance*100)
  };

  const handleArrets = (e) => {
    setArret(e.target.value);
  };

  function geoLoc(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, err=>{console.log(err)},  { enableHighAccuracy: true, maximumAge: 100, timeout: 500000 });
    } else { 
      return false
    }
  }

  function showPosition(position) {
    const stop = arrets.stops.find((spot) => spot.name === arret);
    let long = distance(
      position.coords.latitude,
      position.coords.longitude,
      stop.Latitude,
      stop.Longitude
    );
    setDist(long);
    vibrate()
  }

  return (
    <>
      {transport ? (
        <div className="box-transport-method">
          <span onClick={handleTransport}>
            <TransportBtn
              transport={"pied"}
              bgColor={"linear-gradient(#fd626c,#F83340)"}
            />
          </span>
          <span>
            <TransportBtn
              transport={"bus"}
              bgColor={"linear-gradient(#FFE046,#ffc600)"}
            />
          </span>
          <span>
            <TransportBtn
              transport={"tram"}
              bgColor={"linear-gradient(#30D680,#00c94c)"}
            />
          </span>
          <span>
            <TransportBtn
              transport={"train"}
              bgColor={"linear-gradient(#338CF1,#0b60c1)"}
            />
          </span>
        </div>
      ) : (
        <>
          <div className="choice-stops">
            <svg
              className="choise-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
            </svg>
            <input list="stops" id="search" onChange={handleArrets} />

            <datalist id="stops">
              {arrets.stops.map((arret, i) => (
                <option value={arret.name} key={i} />
              ))}
            </datalist>
          </div>
          <button onClick={geoLoc}>commencer</button> <span>{dist}</span>
        </>
      )}
    </>
  );
};

export default Adapt;
