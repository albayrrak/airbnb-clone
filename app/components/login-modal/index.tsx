"use client";

import React, { useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modals from "../modals";
import Heading from "../heading";
import Input from "../input";
import { toast } from "react-hot-toast";
import Button from "../button";
import { useRouter } from "next/navigation";
import { sign } from "crypto";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const callback = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log(callback);

    if (callback?.ok) {
      setIsLoading(false);
      toast.success("Login successful!");
      router.refresh();
      loginModal.onClose();
    }

    if (callback?.error) {
      toast.error(callback.error);
    }
  };

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input type="text" id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />

      <Input type="password" id="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using Airbnb?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
