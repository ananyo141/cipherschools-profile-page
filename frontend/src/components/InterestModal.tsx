import React, { useState } from "react";

import CustomModal from "./CustomModal";
import EditButton from "./EditButton";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
import { userUpdateInterests } from "../state/features/login/userThunks";

type Props = {
  modalId: string;
};

const InterestModal = ({ modalId }: Props) => {
  const dispatch = useAppDispatch();
  const { interests, accessToken, isLoggedIn } = useAppSelector(
    (state) => state.login
  );

  const [appState, setAppState] = useState(false);
  const [webState, setWebState] = useState(false);
  const [mlState, setMLState] = useState(false);
  const [gameState, setGameState] = useState(false);
  const [dsState, setDSState] = useState(false);
  const [programmingState, setProgrammingState] = useState(false);
  const [dsciState, setDSCIState] = useState(false);
  const [otherState, setOtherState] = useState(false);

  const interestTopics: {
    [key: string]: {
      title: string;
      state: React.SetStateAction<boolean>;
      setState: CallableFunction;
    };
  } = {
    app: {
      title: "App Development",
      state: appState,
      setState: setAppState,
    },
    web: {
      title: "Web Development",
      state: webState,
      setState: setWebState,
    },
    "machine learning": {
      title: "Machine Learning",
      state: mlState,
      setState: setMLState,
    },
    game: {
      title: "Game Development",
      state: gameState,
      setState: setGameState,
    },
    dsa: {
      title: "Data Structures",
      state: dsState,
      setState: setDSState,
    },
    programming: {
      title: "Programming",
      state: programmingState,
      setState: setProgrammingState,
    },
    "data science": {
      title: "Data Science",
      state: dsciState,
      setState: setDSCIState,
    },
    others: {
      title: "Others",
      state: otherState,
      setState: setOtherState,
    },
  };

  React.useEffect(() => {
    // populate interests
    interests.forEach((interest) => {
      if (interestTopics[interest]) {
        interestTopics[interest].setState(true);
      }
    });
  }, [isLoggedIn]);

  const handleInterestChange = () => {
    const interestsArray = Object.keys(interestTopics).filter(
      (interest) => interestTopics[interest].state
    );
    console.log(interestsArray);
    if (accessToken) {
      dispatch(userUpdateInterests({ accessToken, interests: interestsArray }));
    }
  };

  return (
    <>
      <CustomModal modalId={modalId}>
        <div className="rounded-lg bg-white px-7 pt-7">
          <div className="grid grid-cols-2 gap-3">
            {Object.values(interestTopics).map((topic) => {
              return (
                <p
                  onClick={() => topic.setState(!topic.state)}
                  className={`w-56 cursor-pointer rounded-lg p-2 ${
                    topic.state ? "bg-lemon-400" : "bg-gray-200"
                  }`}
                >
                  {topic.title}
                </p>
              );
            })}
          </div>
          <div className="flex justify-end gap-4">
            <label
              htmlFor={modalId}
              className="my-6 w-28 cursor-pointer rounded-md bg-slate-900 py-1 text-center text-white"
            >
              Cancel
            </label>
            <label htmlFor={modalId} onClick={handleInterestChange}>
              <EditButton label="Save" />
            </label>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default InterestModal;
