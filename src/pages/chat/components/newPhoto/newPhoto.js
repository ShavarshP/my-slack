import React, { useState, useEffect, useRef } from "react";
import { loadState } from "../../../../helpers/localStorage";
import { useHttp } from "../../../../hooks/useHttp";

const URL = "https://appslack.herokuapp.com/api/save_photo/";

const NewPhoto = ({ email }) => {
  const [preview, setPreview] = useState([]);
  const [imgContener, setimgContener] = useState([]);
  const [isSave, setIsSave] = useState(true);
  const accept = [".png", ".jpg", ".jpeg", ".gif"];

  const { request } = useHttp();
  let files = [];
  let myimges = [];
  const input = useRef();
  const triggerInput = () => input.current.click();

  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }

    files = Array.from(event.target.files);

    files.forEach((file, index) => {
      if (!file.type.match("image")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target.result;
        myimges = [...myimges, src];
        if (index === files.length - 1) {
          setimgContener([...myimges]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setPreview((prevState) => {
      return (
        <div className="preview">
          {imgContener.map((item, index) => {
            return (
              <div className="w-20" key={index}>
                <img src={item} />
              </div>
            );
          })}
        </div>
      );
    });
  }, [imgContener]);

  useEffect(() => {
    if (isSave) {
      input.current.setAttribute("multiple", true);
      input.current.setAttribute("accept", accept.join(","));
    }
  }, []);

  const save = async () => {
    try {
      setIsSave(false);
      const token = await loadState("auth");
      await request(
        URL,
        "POST",
        {
          email: email,
          photo: imgContener,
        },
        {
          Authorization: `Bearer ${token.token}`,
        }
      );
    } catch (error) {}
  };

  return (
    <div className="flex justify-center mb-1 mt-2">
      {isSave ? (
        <div>
          <div className="flex justify-center">
            <div className="w-20 h-20 flex justify-center items-center overflow-hidden rounded-full border-b-4 border-l-2 border-blue-600">
              {imgContener.length === 1 ? (
                preview
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            ref={input}
            onChange={changeHandler}
          />
          <div className="flex">
            <div
              className="cursor-pointer  h-10 rounded relative top-3 left-2 px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-900 text-white"
              onClick={triggerInput}
            >
              CHOOSE A PHOTO
            </div>
            {imgContener.length === 1 ? (
              <div
                className="cursor-pointer  h-10 rounded relative top-3 left-2 px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-red-700 border-red-900 text-white"
                onClick={save}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="w-20 h-20 flex justify-center items-center overflow-hidden rounded-full border-b-4 border-l-2 text-green-400 border-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default NewPhoto;
