import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../store/characters";
import { getCharacterLocations, getLocations } from "../store/location";
import { getCharacterEpisodes, getEpisodes } from "../store/episodes";
import { getCharacterOrigin, getOrigin } from "../store/origin";
import { Helmet } from "react-helmet";
import CryptoJS from "crypto-js";
import Summary from "../components/Summary";
import Origin from "../components/Origin";
import Location from "../components/Location";
import Episodes from "../components/Episodes";

export default function Detail() {
  const dispatch = useDispatch();
  const characterData = useSelector(getCharacters);
  const locationData = useSelector(getLocations);
  const episodeData = useSelector(getEpisodes);
  const originData = useSelector(getOrigin);
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [episode, setEpisode] = useState([]);

  const { characterId, episodeId } = useParams();

  useEffect(() => {
    try {
      const bytesId = CryptoJS.AES.decrypt(
        characterId,
        process.env.REACT_APP_API_SECRET_KEY
      );

      const bytesEpIds = CryptoJS.AES.decrypt(
        episodeId,
        process.env.REACT_APP_API_SECRET_KEY
      );
      const decryptedData = JSON.parse(bytesId.toString(CryptoJS.enc.Utf8));
      const decryptedEpData = JSON.parse(
        bytesEpIds.toString(CryptoJS.enc.Utf8)
      );

      if (decryptedData) {
        let detail =
          characterData?.all?.results.find(
            (item) => item.id === decryptedData
          ) || null;
        setCharacter(detail);
        let originId = detail?.origin?.url.split("/")[5] || null;
        let locationId = detail?.location?.url.split("/")[5] || null;

        if (originId) {
          dispatch(getCharacterOrigin(originId));
        } else {
          setOrigin(detail?.origin);
        }
        if (locationId) {
          dispatch(getCharacterLocations(locationId));
        } else {
          setLocation(detail?.location);
        }
      }
      dispatch(getCharacterEpisodes(decryptedEpData));
    } catch (e) {
      console.error(e);
      window.location.href = "/";
    }
  }, [dispatch, characterId, episodeId, characterData]);

  useEffect(() => {
    if (locationData && locationData.all) setLocation(locationData.all);
    if (episodeData && episodeData.all) setEpisode(episodeData.all);
    if (originData && originData.all) setOrigin(originData.all);
  }, [locationData, episodeData, originData]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Helmet>
        <title>Rick and Morty</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Rick and Morty Character Description"
        />
      </Helmet>
      <div className="container">
        <div style={{ paddingTop: 100 }}>
          <div className="row">
            <div className="col-md-5 mb-4">
              <Summary character={character} />
            </div>
            <div className="col-md-7">
              <Origin origin={origin} />
              <Location location={location} />
              <Episodes episode={episode} />
            </div>
          </div>
        </div>
      </div>
      <div className="goback" onClick={() => goBack()}>
        Go Back
      </div>
    </div>
  );
}
