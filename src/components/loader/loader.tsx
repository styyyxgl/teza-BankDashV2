import styles from "./styles.module.css";

export const Loader = () => {
  // TODO: upgrade to a good version
  return (
    <div className={styles.loader}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="4">
            <circle strokeOpacity=".5" cx="24" cy="24" r="24" />
            <path d="M24 0c13.255 0 24 10.745 24 24">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 24 24"
                to="360 24 24"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  );
};
