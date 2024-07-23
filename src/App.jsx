import { useEffect, useState } from "react";
import Navbar from "./commonents/Navbar";
import Profile from "./commonents/Profile";
import Searchbar from "./commonents/Searchbar";
import Loader from "./commonents/Loader";
import RepoChart from "./commonents/RepoChart";

function App() {
  const [user, setUser] = useState({ username: "" });
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("NURBEK2107");
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(true);
  const [github, setGithub] = useState({});
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    avatar_url: "",
    login: "",
    created_at: "",
    bio: "",
    public_repos: "",
    followers: "",
    following: "",
    location: "",
    blog: "",
    twitter_username: "",
    company: "",
    message: "",
  });

  function handleUser(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch(`https://api.github.com/users/${input}`);
        if (res.status === 200) {
          const data = await res.json();
          setError(false);
          setGithub(data);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    }
    getProfile();
  }, [input]);

  useEffect(() => {
    async function getRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${input}/repos`);
        if (res.status === 200) {
          const data = await res.json();
          setRepos(data);
        } else {
          console.error(res.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getRepos();
  }, [input]);

  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: github.name,
      avatar_url: github.avatar_url,
      login: github.login,
      created_at: github.created_at,
      bio: github.bio,
      public_repos: github.public_repos,
      followers: github.followers,
      following: github.following,
      location: github.location,
      blog: github.blog,
      twitter_username: github.twitter_username,
      company: github.company,
    }));
  }, [github]);

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme);
  }

  function handleClick(event) {
    event.preventDefault();
    setInput(user.username);
  }

  return (
    <div
      className={`${
        theme ? "bg-dark-navy-blue" : "bg-whitish-blue"
      } w-full min-h-screen flex flex-col justify-center items-center py-20`}
    >
      {loading ? (
        <Loader dark={theme} />
      ) : (
        <>
          <div className="w-11/12 xs:w-5/6 sm:w-110 600:w-100 lg:w-[1350px] ">
            <Navbar onClick={toggleTheme} dark={theme} />
          </div>
          <div className="xs:w-5/6 w-11/12 sm:w-110 600:w-100 lg:w-[1350px] ">
            <Searchbar
              onChange={handleUser}
              user={user.username}
              onClick={handleClick}
              error={error}
              dark={theme}
            />
          </div>
          <div className="flex items-center gap-10 flex-wrap">
            <div className="xs:w-5/6 w-11/12 600:w-100 sm:w-110 lg:w-120 ">
              <Profile
                input={input}
                user={user.username}
                profile={profile}
                dark={theme}
              />
            </div>
            <div className="">
              <RepoChart data={repos} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
