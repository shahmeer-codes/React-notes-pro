import { useState } from "react";

const App = () => {
  const [task, settask] = useState("");
  const [detail, setdetail] = useState("");
  const [arr, setarr] = useState([]);

  function sub(e) {
    e.preventDefault();
    if (task == "" || detail == "") {
      alert("Please Enter data compleletly....");
    } else {
      setarr([...arr, { head: task, body: detail }]);
      setdetail("");
      settask("");
    }
  }
  function del(k) {
    setarr(
      arr.filter((_, index) => {
        return index !== k;
      }),
    );
  }
  function slc(l) {
    l.preventDefault();
    localStorage.setItem("user", JSON.stringify(arr));
  }
  function clr(c) {
    c.preventDefault();
    localStorage.clear();
  }
  function retrive(r) {
    r.preventDefault();
    const u = JSON.parse(localStorage.getItem("user") || "[]");
    const brr = [...u, ...arr];
    if (u == "") {
      alert("No record in local storage...!");
    } else {
      setarr(brr);
    }
  }
  return (
    <>
      <h1 className="h-20 w-full flex justify-center items-center text-2xl text-white font-bold">
        Notes generator
      </h1>

      <div className="flex">
        <div className="flex justify-center items-center bg-gray-500 border-r-8 border-black h-150 w-150 text-white">
          <form
            onSubmit={(e) => {
              sub(e);
            }}
            className="bg-black h-100 w-80 p-5 rounded-2xl"
          >
            <h1 className="flex justify-center font-black">Enter task</h1>
            <input
              onChange={(t) => {
                settask(t.target.value);
              }}
              value={task}
              type="text"
              placeholder="Enter your work"
              className="bg-amber-50 w-65 text-black m-2 p-3 rounded-2xl"
            />
            <textarea
              onChange={(d) => {
                setdetail(d.target.value);
              }}
              value={detail}
              placeholder="Enter details"
              className="bg-amber-50 h-50 w-65 m-2 p-3 text-black rounded-2xl"
            />
            <button className="bg-gray-800 p-2 m-2 hover:bg-gray-700 rounded-2xl">
              submit
            </button>
            <button
              onClick={(l) => {
                slc(l);
              }}
              className="bg-gray-800 p-2 m-2 hover:bg-gray-700 rounded-2xl"
            >
              local-save
            </button>
            <button
              onClick={(c) => {
                clr(c);
              }}
              className="bg-gray-800 p-2 hover:bg-gray-700 rounded-2xl"
            >
              clear-local
            </button>
            <button
              onClick={(r) => {
                retrive(r);
              }}
              className="bg-red-600 p-2 h-10 w-50 m-10 hover:bg-red-500 rounded-2xl"
            >
              retrive-previous
            </button>
          </form>
        </div>

        <div className="bg-amber-500 grid grid-cols-4  w-350 p-5">
          {arr.map((i, k) => {
            return (
              <div key={k} className="flex flex-col justify-between">
                <div className="min-h-50 h-fit w-fit p-2 m-3 bg-amber-200 rounded-2xl">
                  <h1 className="flex justify-center h-7 min-w-40 w-fit font-extrabold">
                    {i.head}
                  </h1>
                  <p className="border-t-4 border-white font-bold">{i.body}</p>
                  <div className="flex justify-center mt-25">
                    <button
                      onClick={() => {
                        del(k);
                      }}
                      className="bg-red-600 hover:bg-red-500 h-10 w-30 p-2 rounded-2xl"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
