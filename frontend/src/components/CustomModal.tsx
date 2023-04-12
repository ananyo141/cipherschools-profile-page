import React from "react";

type Props = {
  modalId: string;
  className?: string;
  children?: React.ReactNode;
};

const CustomModal = ({ modalId, className, children }: Props) => {
  return (
    <div className={className}>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
