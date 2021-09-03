import React from "react";
import ToggleSwitch from "../Shared/ToggleSwitch";
import "./Modal.css";

interface IModal {
  setModalOpen: any;
  isVideoOn: boolean;
  setIsVideoOn: any;
  isVolumeOn: boolean;
  setIsVolumOn: any;
}
const Modal: React.FC<IModal> = ({
  setModalOpen,
  isVideoOn,
  setIsVideoOn,
  isVolumeOn,
  setIsVolumOn,
}) => {
  return (
    <div className="background">
      <div className="modal-container">
        <h2>Title</h2>
        <div className="body">
          {/* <ToggleSwitch isVideoOn={isVideoOn} setIsVideoOn={setIsVideoOn} /> */}
          <button onClick={() => setModalOpen(false)}>Join</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
