/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { getAllCharacters, getCharacters } from "../store/characters";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import CryptoJS from "crypto-js";

export default function CharacterList() {
  const dispatch = useDispatch();
  const data = useSelector(getCharacters);
  const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.all) {
      setState(data.all);
    }
  }, [data]);

  const showDetail = (id) => {
    let episodeIds = handleEpisodeId(id);

    const cipherId = encodeURIComponent(
      CryptoJS.AES.encrypt(
        JSON.stringify(id),
        process.env.REACT_APP_API_SECRET_KEY
      ).toString()
    );

    const cipherEpIds = encodeURIComponent(
      CryptoJS.AES.encrypt(
        JSON.stringify(episodeIds),
        process.env.REACT_APP_API_SECRET_KEY
      ).toString()
    );

    window.location.href = `/detail/${cipherId}/${cipherEpIds}`;
  };

  const handleEpisodeId = (id) => {
    const selectedChacracter = state.results.find((item) => item.id === id);
    const episodeId = selectedChacracter.episode.map(
      (item) => item.split("/")[5]
    );
    return episodeId;
  };

  return (
    <div className="profile">
      <header className="App-header">
        <p>The Rick and Morty</p>
      </header>
      <div className="container my-5">
        <div className="row">
          {state?.results?.map((character) => (
            <div className="col-md-6" key={character.id}>
              <div className="card mb-3  box-shadow">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-md-4 fill">
                      <img
                        src={character.image}
                        alt="character"
                        className="card-img-top"
                      />
                    </div>
                    <div className="col-md-8 text-start p-3">
                      <h3 className="card-title">{character.name}</h3>
                      <div
                        className="d-flex flex-row mb-3"
                        style={{ lineHeight: 1 }}
                      >
                        <div className="d-flex align-items-center">
                          {character.status === "Alive" ? (
                            <div className="alive" />
                          ) : (
                            <div className="dead" />
                          )}
                        </div>
                        <div className="mx-2">{character.status}</div>{" "}
                        <div>-</div>
                        <div className="mx-2">{character.species}</div>
                        <div>-</div>
                        <div className="mx-2">{character.gender}</div>
                      </div>
                      <p className="card-text">
                        <span className="text-muted">Last known location:</span>
                        <br />
                        {character.location.name}
                      </p>
                      <p className="card-text">
                        <span className="text-muted">First seen in:</span>
                        <br />
                        {character.origin.name}
                      </p>
                      <div className="d-flex justify-content-end px-3">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => showDetail(character.id)}
                        >
                          <FontAwesomeIcon icon={faInfo} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
