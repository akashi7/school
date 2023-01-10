import { useState } from "react";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import img_1 from "../resources/images/image-2.png";
import img_1 from "../resources/images/card.jpeg";
import {
  FaMobileAlt,
  FaLock,
  FaMoneyBillAlt,
  FaPhoneVolume,
} from "react-icons/fa";

function TabCmp() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tab-cmp">
      <div className="wraper ">
        <div className="tabs-wraper">
          <div className="tabs-container">
            <div
              data-tab-item
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              <div className="icon">
                <FaMobileAlt />
              </div>
              <div className="title">Mobile App</div>
            </div>
            <div
              data-tab-item
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              <div className="icon">
                <FaLock />
              </div>
              <div className="title">Highly secured</div>
            </div>
            <div
              data-tab-item
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              <div className="icon">
                <FaMoneyBillAlt />
              </div>
              <div className="title">No hidden fees</div>
            </div>

            <div
              data-tab-item
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              <div className="icon">
                <FaPhoneVolume />
              </div>
              <div className="title">24/7 support</div>
            </div>
          </div>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <div className="wraper">
              <div className="left">
                <h3 className="title">SchoolNest Pay Mobile App</h3>
                <p className="desc">
                  Students or guardians are able to check all the student's
                  transactions using a unique payment code.
                </p>
              </div>
              <div className="right">
                <div className="tabCmp__imageContiner">
                  <img src={img_1} alt="nestpay" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <div className="wraper">
              <div className="left">
                <h3 className="title">Transact with confidence</h3>
                <p className="desc">
                  SchoolNest uses state-of-the-art infrastructure to secure
                  client transactions.
                </p>
              </div>
              <div className="right">
                <img src={img_1} alt="nestpay" />
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            <div className="wraper">
              <div className="left">
                <h3 className="title">
                  No need to take or send payment proof to the school!
                </h3>
                <p className="desc">
                  SchoolNest Pay is equipped with instant bank reconciliation.
                  The moment you finish paying school fees, the school gets an
                  alert that you have paid
                </p>
              </div>
              <div className="right">
                <img src={img_1} alt="nestpay" />
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 4 ? "content  active-content" : "content"
            }
          >
            <div className="wraper">
              <div className="left">
                <h3 className="title">Friendly customer support</h3>
                <p className="desc">
                  Content: Our team works around the clock to solve any
                  difficulties you might encounter! Kindly reach out anytime!
                </p>
              </div>
              <div className="right">
                <img src={img_1} alt="nestpay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabCmp;
