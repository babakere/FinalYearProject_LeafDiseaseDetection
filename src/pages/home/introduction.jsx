import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Cards from "../../components/cards";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import { Card } from "primereact/card";
import { useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Introduction() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className=" my-5">
      <div className="col">
        <div className="w-5 mx-auto shadow-5 m-4">
          <Card
            title="Welcome to Vine Leaf Classifier"
            subTitle="Classify Your Vine Leaves"
          />
        </div>
        <div className="text-center p-3  text-3xl">
          <Card className="w-6 mx-auto shadow-5">
            <p className="text-xl mb-4 my-5 ">
              Join us and contribute to the health of vineyards with our
              AI-powered detection system.
            </p>
            <div className="flex align-items-center justify-content-center gap-3 mb-4">
              {!isLoggedIn && (
                <Button
                  label="Sign Up"
                  icon="pi pi-user-plus"
                  onClick={() => navigate("/signup")}
                  aria-label="Sign Up"
                />
              )}
              <Button
                label="Learn more about Vine Leaf Classifier"
                onClick={() => {
                  navigate("/about");
                }}
                aria-label="Learn more about Vine Leaf Classifier"
              />
            </div>
          </Card>
          <div className="my-5 ">
            <Cards />
          </div>
        </div>
        <div className="mx-auto ">
          <Message
            className="shadow-3"
            severity="warn"
            text="Disclaimer: All images uploaded will be used to improve our disease detection algorithms and ensure better accuracy."
          />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
