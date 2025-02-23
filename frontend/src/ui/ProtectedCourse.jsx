import { useEffect, useState } from "react";

function ProtectedCourse() {
  const [isRegistered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchRegistered() {}
  }, []);
  return <div></div>;
}

export default ProtectedCourse;
