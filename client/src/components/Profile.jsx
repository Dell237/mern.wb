import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangePassword,
  deleteAccount,
  logOut,
  updateProfileBild,
  updateUsername,
} from "../features/api/apiSlice";
import FileBase from "react-file-base64";

const Profile = () => {
  const { userId, user, isLoading, status } = useSelector(
    (state) => state.user
  );

  // const fileRef = useRef("");
  const dispatch = useDispatch();
  const [username, setUsername] = useState(true);
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(true);
  const [statusTimer, setStatusTimer] = useState(false);
  const [changePic, setChangePic] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profileBild: "",
  });
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangePic = async (e, userId) => {
    e.preventDefault();
    try {
      const { profileBild } = formData;
      if (profileBild.length === 0 && !changePic) {
        console.log(profileBild.length, changePic);
        const data = await dispatch(
          updateProfileBild({ userId, profileBild })
        ).unwrap();
        setChangePic(false);

        return data;
      }

      const data = await dispatch(
        updateProfileBild({ userId, profileBild })
      ).unwrap();
      setChangePic(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeUserName = async (e, userId) => {
    e.preventDefault();
    try {
      const { username } = formData;
      const data = await dispatch(
        updateUsername({ userId, username })
      ).unwrap();
      console.log(data);
      setUsername(true);
      setFormData({ ...formData, [username]: user.username });
      setStatusTimer(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    await dispatch(/*  */);
  };
  const handleChangePassword = async (e, userId) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;
    try {
      if (userId) {
        const data = await dispatch(
          ChangePassword({ userId, oldPassword, newPassword })
        ).unwrap();
        setPassword(true);
        setStatusTimer(true);

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async (e) => {
    e.preventDefault();
    await dispatch(logOut());
  };
  const handelDeleteAccount = async (e, userId) => {
    e.preventDefault();
    console.log(userId);
    await dispatch(deleteAccount({ userId }));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusTimer(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [password, username, user]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 pt-5">Profile</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleChangePic(e, userId)}
      >
        <img
          src={user.profileBild}
          alt="profileBild"
          className="h-52 w-52 self-center rounded-full object-cover mt-2"
        />
        {changePic ? (
          <div className="flex justify-center">
            <FileBase
              accept="image/*"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, profileBild: base64 })
              }
            />
          </div>
        ) : null}

        <div className="flex flex-row justify-between  text-center">
          <button
            type={changePic ? "button" : "submit"}
            onClick={() => setChangePic((show) => !show)}
            className="text-black border-2 border-solid pt-1 pb-1 w-1/2 font-semibold rounded-3xl cursor-pointer"
          >
            Ersetzen
          </button>
          {changePic ? (
            <button
              type="button"
              onClick={() => setChangePic((show) => !show)}
              className="  text-green-500  w-1/2 font-semibold pt-1 pb-1 rounded-3xl hover:opacity-40 disabled:opacity-80"
            >
              Abbrechen
            </button>
          ) : (
            <span
              className="text-red-700  w-1/2 font-semibold pt-1 pb-1 rounded-3xl cursor-pointer hover:bg-red-100"
              onClick={(e) => handleChangePic(e, userId)}
            >
              Entfernen
            </span>
          )}
        </div>
      </form>
      <div className="pt-6 pb-6">
        <div className="border-solid border-t-2"></div>
      </div>
      <div className="relative flex items-center justify-center">
        {statusTimer && (
          <p
            className={
              status
                ? " text-green-400 font-bold p-2 mt-2"
                : "absolute -left-2/4"
            }
          >
            {status}
          </p>
        )}
      </div>
      <ul className="flex flex-col gap-10 max-w-lg mx-auto ml-0 mr-0">
        <li className="grid grid-cols-2">
          <span className="text-left text-lg items-center">
            <label>
              <span>Dein Benutzername:</span>
            </label>
          </span>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleChangeUserName(e, userId)}
          >
            {username ? (
              <>
                <span>{user.username}</span>
                <button
                  type="button"
                  onClick={() => setUsername((show) => !show)}
                  className="border-2 border-solid font-medium p-2 rounded-3xl hover:opacity-75 disabled:opacity-80"
                >
                  {isLoading ? "Loading..." : "Benutzername ändern"}
                </button>
              </>
            ) : (
              <div className="flex flex-col justify-stretch gap-2">
                <input
                  type="text"
                  id="username"
                  placeholder={user.username}
                  onChange={handelChange}
                  value={formData.username}
                  className="border-2 rounded-md p-1"
                  disabled={isLoading}
                />
                <p className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="border-2 border-solid font-medium p-2 rounded-3xl hover:opacity-75 disabled:opacity-80"
                  >
                    {isLoading ? "Loading..." : "Benutzername ändern"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsername((show) => !show)}
                    className="  text-green-500 p-2   hover:opacity-40 disabled:opacity-80"
                  >
                    Abbrechen
                  </button>
                </p>
              </div>
            )}
          </form>
        </li>
        <li className="grid grid-cols-2">
          <span className="text-left text-lg items-center">
            <label>
              <span>Deine E-Mail:</span>
            </label>
          </span>
          <form className="flex flex-col gap-4" onSubmit={handleChangeEmail}>
            {email ? (
              <>
                <span>{user.email}</span>
                <button
                  type="button"
                  onClick={() => setEmail((show) => !show)}
                  className="border-2 border-solid font-medium p-2 rounded-3xl hover:opacity-75 disabled:opacity-80"
                >
                  {isLoading ? "Loading..." : "Email ändern"}
                </button>
              </>
            ) : (
              <div className="flex flex-col justify-stretch gap-2">
                <input
                  type="text"
                  id="email"
                  onChange={handelChange}
                  value={formData.email}
                  className="border-2 rounded-md p-1"
                  disabled={isLoading}
                />
                <p className="flex flex-col gap-2">
                  <button
                    type="button"
                    className=" border-2 border-solid font-medium p-2 rounded-3xl   hover:opacity-75 disabled:opacity-80"
                  >
                    {isLoading ? "Loading..." : "Email ändern"}
                  </button>
                  <button
                    type="submit"
                    onClick={() => setEmail((show) => !show)}
                    className="  text-green-500 p-2   hover:opacity-40 disabled:opacity-80"
                  >
                    Abbrechen
                  </button>
                </p>
              </div>
            )}
          </form>
        </li>
        <li className="grid grid-cols-2">
          <span className="text-left text-lg items-center">
            <label>
              <span>Passwort festlegen:</span>
            </label>
          </span>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleChangePassword(e, userId)}
          >
            {password ? (
              <>
                <span>...</span>
                <button
                  type="button"
                  onClick={() => setPassword((show) => !show)}
                  className="  border-2 border-solid font-medium p-2 rounded-3xl    hover:opacity-75 disabled:opacity-80"
                >
                  {isLoading ? "Loading..." : "Passwort ändern"}
                </button>
              </>
            ) : (
              <div className="flex flex-col justify-stretch gap-2">
                {statusTimer && (
                  <p
                    className={
                      status
                        ? "bg-red-400 text-fuchsia-50 font-bold p-2 mt-2"
                        : "absolute -left-2/4"
                    }
                  >
                    {status}
                  </p>
                )}

                <input
                  type="password"
                  id="oldPassword"
                  onChange={handelChange}
                  value={formData.oldPassword}
                  placeholder="old Password"
                  className="border-2 rounded-md p-1"
                />
                <input
                  type="password"
                  id="newPassword"
                  onChange={handelChange}
                  value={formData.newPassword}
                  placeholder="new Password"
                  className="border-2 rounded-md p-1"
                  disabled={isLoading}
                />
                <p className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className=" border-2 border-solid font-medium p-2 rounded-3xl   hover:opacity-75 disabled:opacity-80"
                  >
                    {isLoading ? "Loading..." : "Passwort ändern"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPassword((show) => !show)}
                    className="  text-green-500 p-2   hover:opacity-40 disabled:opacity-80"
                  >
                    Abbrechen
                  </button>
                </p>
              </div>
            )}
          </form>
        </li>

        <div className=" pb-6">
          <div className="border-solid border-t-2"></div>
        </div>
      </ul>
      <div className="flex flex-row justify-between text-center">
        <span
          className="text-red-700 border-2 border-solid font-medium p-2 w-1/3 rounded-3xl cursor-pointer hover:bg-red-100"
          onClick={(e) => handelDeleteAccount(e, userId)}
        >
          Account löschen
        </span>
        <span
          className="text-green-500 border-2 border-solid font-medium p-2 w-1/3 rounded-3xl cursor-pointer"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
