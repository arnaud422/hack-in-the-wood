import React, { useEffect, useState } from "react";
import TransportBtn from "../transportButton";
import "../style/adapt.css";

const Adapt = () => {
  // const [arrets, setArrets] = useState([])
  const [arret, setArret] = useState("");
  const [positionUser, setPositionUser] = useState();
  const [dist, setDist] = useState();

  const arrets = {
    stops: [
      { Name: "Tente fond", Latitude: 50.601759, Longitude: 3.510466 },
      { Name: "Maker Lab", Latitude: 50.601767, Longitude: 3.510722 },
      { Name: "Point info", Latitude: 50.601324, Longitude: 3.511161 },
      { Name: "Entrée", Latitude: 50.601096, Longitude: 3.511567 },
    ],
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        showPosition,
        (err) => {
          console.log(err);
        },
        { enableHighAccuracy: true, maximumAge: 100, timeout: 500000 }
      );
    } else {
      return false;
    }

    // addTecData();
  }, [addTecData]);

  function addTecData() {
    fetch("https://static.tectime.be/stops?all=true")
      .then((response) => response.json())
      .then((data) => triDataStops(data.StopsResult)); //setArrets(data.StopsResult)
  }

  function triDataStops(data) {

    const stops = data.filter(
      (stop) =>
        distance(
          positionUser.coords.latitude,
          positionUser.coords.longitude,
          stop.Latitude,
          stop.Longitude
        ) < 40000
    )
    
    for(let i=0; i<stops.length-1;i++){
        arrets.stops.push({Name:stops[i].Name, Latitude:stops[i].Latitude, Longitude:stops[i].Longitude})
    }
    console.log(arrets)
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

  const vibrate = () => {
    window.navigator.vibrate([700, 300, 700]);
  };

  const handleArrets = (e) => {
    setArret(e.target.value);
  };

  function showPosition(position) {
    const location = arrets.stops.find((spot) => spot.name === arret);
    setPositionUser(position);

    if (location === undefined) return;

    const long = distance(
      position.coords.latitude,
      position.coords.longitude,
      location.Latitude,
      location.Longitude
    );

    if (long <= 7) {
      vibrate();
    }
  }

  // useEffect(()=>{
  //     fetch('https://static.tectime.be/stops?all=true')
  //     .then(response => response.json())
  //     .then(data => setArrets(data.StopsResult));
  // },[])

  return (
    <>
      <div className="box-transport-method">
        <TransportBtn transport={"bus"} bgColor={"#FFE046"} />
        <TransportBtn transport={"train"} bgColor={"#338CF1"} />
        <TransportBtn transport={"pied"} bgColor={"#F83340"} />
        <TransportBtn transport={"tram"} bgColor={"#30F680"} />
      </div>

      <div className="choice-stops">
        <input list="stops" id="search" onChange={handleArrets} />
        <button>commencer</button>

        <datalist id="stops">
          {arrets.stops.map((arret, i) => (
            <option value={arret.name} key={i} />
          ))}
        </datalist>
        {/* <span className='dist'>{dist}</span> */}
        <span className="dist" id="test"></span>
      </div>
    </>
  );
};

export default Adapt;
