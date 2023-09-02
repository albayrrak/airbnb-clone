"use client";
import React from "react";
import cn from "classnames";
import { IoMdClose } from "react-icons/io";
import Button from "../button";

type ModalsProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modals = (props: ModalsProps) => {
  const [showModal, setShowModal] = React.useState(props.isOpen);

  React.useEffect(() => {
    setShowModal(props.isOpen);
  }, [props.isOpen]);

  const handleClose = React.useCallback(() => {
    if (props.disabled) {
      return;
    }
    setShowModal(false);

    setTimeout(() => {
      props.onClose();
    }, 300);
  }, [props.disabled, props.onClose]);

  const handleSubmit = React.useCallback(() => {
    if (props.disabled) {
      return;
    }
    props.onSubmit();
  }, [props.disabled, props.onSubmit]);

  const handleSecondaryAction = React.useCallback(() => {
    if (props.disabled || !props.secondaryAction) {
      return;
    }

    props.secondaryAction();
  }, [props.disabled, props.secondaryAction]);

  if (!props.isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*content*/}
          <div
            className={cn("translate duration-300 h-full ", {
              "translate-y-0": showModal,
              "opacity-100": showModal,
              "translate-y-full": !showModal,
              "opacity-0": !showModal,
            })}
          >
            <div className="translate h-full lg:h-auto md:h-auto borde-0 rounded-lg shadow-lg relative bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px] ">
                <button
                  onClick={props.onClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{props.title}</div>
              </div>

              {/*body*/}
              <div className="relative p-6 flex-auto">{props.body}</div>

              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {props.secondaryAction && props.secondaryActionLabel && (
                    <Button
                      disabled={props.disabled}
                      label={props.secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={props.disabled}
                    label={props.actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {props.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;