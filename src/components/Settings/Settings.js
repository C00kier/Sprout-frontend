import "./Settings.css";
import DeletePopUp from "./DeletePopUp.js";
import { useNavigate } from "react-router-dom";
import COMPONENT_STATE from "../../constants/myAccountComponentStates.js";
import PAGES from "../../constants/pages.js";
import userIconImage from "../../../src/assets/user/user-circle.256x256.png";
import { useState, useEffect, useContext } from "react";
import eyeShow from "../../assets/RegisterPage/eyeShow.png";
import eyeHide from "../../assets/RegisterPage/eyeHide.png";
import { profileImageContext } from "../../App.js";

export default function Settings({
  setFunctionalityElement,
  userId,
  token,
  removeCookie,
  setCookie,
}) {
  const [nickName, setNickName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [updated, setUpdated] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { profileImage, setProfileImage } = useContext(profileImageContext);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userId]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  function handleEmailInput(e) {
    const targetValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (targetValue.match(emailRegex) || targetValue.length === 0) {
      setEmail(targetValue);
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function handlePasswordInput(e) {
    const targetValue = e.target.value;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (targetValue.match(passwordRegex) || targetValue.length === 0) {
      setIsPasswordValid(true);
      setNewPassword(targetValue);
    } else {
      setIsPasswordValid(false);
    }
  }

  function eyeIconEvent() {
    setIsPasswordShown(!isPasswordShown);
  }

  const handleSignOut = () => {
    removeCookie("token");
    removeCookie("userId");
    navigate(PAGES.HOME);
  };

  async function updateEvent(toUpdate) {
    let requestData = updateSwitch(toUpdate);

    try {
      const response = await fetch(`${BASE_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        setUpdated(toUpdate);
      } else if (response.status === 202) {
        const data = await response.text();
        setUpdated(toUpdate);
        setCookie("token", data, { path: "/" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function confirmDelete() {
    try {
      const response = await fetch(`${BASE_URL}/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo.userId),
      });

      if (response.status === 200) {
        console.log(response);
        handleSignOut();
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setShowDeletePopup(false);
  }

  async function updateProfileImageEvent() {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    try {
      const response = await fetch(`${BASE_URL}/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setProfileImage(URL.createObjectURL(selectedFile));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  function cancelDelete() {
    setShowDeletePopup(false);
  }

  function updateSwitch(toUpdate) {
    switch (toUpdate) {
      case "nickname":
        return {
          userId: userId,
          newNickName: nickName,
        };
      case "email":
        return {
          userId: userId,
          newEmail: email,
        };
      case "password":
        return {
          userId: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
    }
  }
  return (
    <>
      <div className="settings-container">
        <h1 className="setting-title">Ustawienia Użytkownika:</h1>
        <div className="user-info-container">
          Nickname:
          <p>{userInfo && userInfo.nickName}</p>
          Email:
          <p>{userInfo && userInfo.email}</p>
          <img
            src={
              profileImage ? profileImage : (userInfo && userInfo.photoUrl ? userInfo.photoUrl : userIconImage)
            }
            alt=""
          />
        </div>

        <p className="change-text">Zmień zdjęcie profilowe</p>
        <div id="settings-change-image-div" className="flex-column">
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
          <p id="image-change-description">Rozmiar zdjecia nie może być większy niż 1MB</p>
          {
            selectedFile !== null
            &&
            <div className="confirm-button" onClick={() => updateProfileImageEvent()}>
              <span>Zatwierdź</span>
            </div>
          }
        </div>
        <p className="change-text">Zmień pseudonim</p>
        <input
          className="change-input-nickname"
          placeholder="Nowy pseudonim"
          type="text"
          onChange={(e) => setNickName(e.target.value)}
        ></input>
        <div className="confirm-button" onClick={() => updateEvent("nickname")}>
          <span>Zmień</span>
        </div>
        <p
          className={
            updated === "nickname"
              ? "change-confirmation"
              : "change-confirmation-invisible"
          }
        >
          Pseudonim został zmieniony!
        </p>
        {userInfo && userInfo.userType === "GOOGLE_USER" ? (
          <></>
        ) : (
          <>
            <p className="change-text">Zmień email</p>
            <input
              className="change-input"
              placeholder="Nowy email"
              type="text"
              onChange={(e) => handleEmailInput(e)}
            ></input>
            <p className={isEmailValid ? "alert-invisible" : "alert-visible"}>
              * Wprowadź poprawny adres email
            </p>
            <div
              className="confirm-button"
              onClick={() => updateEvent("email")}
            >
              <span>Zmień</span>
            </div>
            <p
              className={
                updated === "email"
                  ? "change-confirmation"
                  : "change-confirmation-invisible"
              }
            >
              Email został zmieniony!
            </p>
            <p className="change-text">Zmień hasło</p>
            <div className="new-password-input-container">
              <input
                className="change-input"
                placeholder="Stare hasło"
                type={isPasswordShown ? "text" : "password"}
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
              <img
                className={isPasswordShown ? "eye-icon-2" : "eye-icon-1"}
                src={isPasswordShown ? eyeHide : eyeShow}
                onClick={() => eyeIconEvent()}
                alt=""
              />
            </div>
            <div className="new-password-input-container">
              <input
                className="change-input"
                placeholder="Nowe hasło"
                type={isPasswordShown ? "text" : "password"}
                onChange={(e) => handlePasswordInput(e)}
              ></input>
              <img
                className={isPasswordShown ? "eye-icon-2" : "eye-icon-1"}
                src={isPasswordShown ? eyeHide : eyeShow}
                onClick={() => eyeIconEvent()}
                alt=""
              />
            </div>
            <p
              className={isPasswordValid ? "alert-invisible" : "alert-visible"}
            >
              * Hasło musi zawierać 8-16 znaków, conajmniej 1 cyfrę i znak
              specjalny
            </p>
            <div
              className="confirm-button"
              onClick={isPasswordValid ? () => updateEvent("password") : null}
            >
              <span>Zmień</span>
            </div>
            <p
              className={
                updated === "password"
                  ? "change-confirmation"
                  : "change-confirmation-invisible"
              }
            >
              Hasło zostało zmienione!
            </p>
          </>
        )}
        <p className="change-text">Zauktualizuj quiz</p>
        <p className="info-text">
          Zdajemy sobie sprawę, że Twoje życie może często się zmieniać, jak
          potrzeby Twoich roślin. Wypełnij jeszcze raz quiz, aby uzyskać nową
          rekomendację roślin.{" "}
        </p>
        <div
          className="confirm-button"
          onClick={() => setFunctionalityElement(COMPONENT_STATE.QUIZ)}
        >
          <span>Zaktualizuj</span>
        </div>
        <p className="change-text">Usuń konto</p>
        <p className="info-text">
          Usuwając konto z naszego serwisu utracisz wszystkie zapisane dane, w
          tym nformacje o swoich kwiatkach oraz wszystkie zdobyte odznaki.
        </p>
        <div
          className="confirm-button-delete"
          onClick={() => setShowDeletePopup(true)}
        >
          <span>Usuń</span>
        </div>
      </div>
      {showDeletePopup && (
        <DeletePopUp
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        ></DeletePopUp>
      )}
    </>
  );
}
