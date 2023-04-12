import React from "react";

import * as UserApi from "../../api/UserApi";
import FollowerTile from "../../components/FollowerTile";
import { useAppSelector } from "../../hooks/useReduxHooks";

type Props = {};

const Followers = (props: Props) => {
  const [followers, setFollowers] = React.useState([]);
  const { accessToken, isLoggedIn } = useAppSelector((state) => state.login);
  React.useEffect(() => {
    // fetch followers
    if (accessToken) {
      UserApi.userFollowers(accessToken).then((res) => {
        console.log(res.docs);
        setFollowers(res.docs);
      });
    }
  }, [accessToken, isLoggedIn]);

  return (
    <div className="mt-6 min-h-screen bg-slate-900 p-4">
      <h1 className="mb-4 text-xl text-gray-100">Users Following You</h1>
      <div className="flex flex-wrap gap-4">
        {followers.map((user: any) => (
          <FollowerTile
            key={user.id}
            userName={user.name}
            currentWork={user.currentWork}
            followers={user.followers.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Followers;
