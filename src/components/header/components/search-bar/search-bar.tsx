import { useState } from "react";
import MagnifyingGlassIcon from "~/assets/icons/Magnifying-glass.svg?react";

import styles from "./styles.module.css";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles["search"]}>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="Search for something"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button className={styles["search-button"]} type="button">
        <MagnifyingGlassIcon />
      </button>
    </div>
  );
};