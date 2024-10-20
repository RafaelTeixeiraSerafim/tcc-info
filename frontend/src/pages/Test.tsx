import { useEffect, useMemo, useState } from "react";

export default function Test() {
  const [obj, setObj] = useState({
    id: 0,
    name: "",
  });
  const [count, setCount] = useState(0);

  const outerObj = useMemo(() => {
    return {};
  }, []);

  useEffect(() => {
    setCount(0);
  }, [outerObj]);

  console.log("rerender");

  return (
    <div style={{marginTop: "7rem"}}>
      <h1>Test</h1>
      <p>new build</p>
      <h3>Obj</h3>
      <ul>
        <li>{obj.id}</li>
        <li>{obj.name}</li>
        <button
          onClick={() =>
            setObj((prevObj) => {
              return { ...prevObj, name: prevObj.name + count.toString() };
            })
          }
        >
          Change
        </button>
      </ul>
      <br />
      <h3>Count</h3>
      <p>{count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
    </div>
  );
}
