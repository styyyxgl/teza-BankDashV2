import { useState } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { Input } from "~/components/input/input";
import { authValidationRules } from "~/utils/auth-validation-rules";
import Logo from "~/assets/img/small-logo.svg?react";

import styles from "./styles.module.css";

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type Properties = {
  onSubmit: (data: SignUpData) => void;
};

export const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = authValidationRules({
      name,
      email,
      password,
    });

    if (isValid) {
      onSubmit({ name, email, password });
    } else {
      setErrors({
        name: validationErrors.name || "",
        email: validationErrors.email || "",
        password: validationErrors.password || "",
      });
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <Link to={AppRoute.DASHBOARD}>
          <Logo />
        </Link>
        <h2 className={styles["title"]}>Sign Up</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles["form"]} noValidate>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(val) => {
            setName(val);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={errors.name}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(val) => {
            setEmail(val);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: "" }));
          }}
          error={errors.password}
        />

        <button type="submit" className={styles["button"]}>
          Sign Up
        </button>
      </form>

      <div className={styles["footer"]}>
        Already have an account? <Link to={AppRoute.SIGN_IN}>Sign In</Link>
      </div>
    </div>
  );
};
