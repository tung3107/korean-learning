function Logo({ width, text = true, admin = false }) {
  return (
    <div className="logo flex items-center justify-center">
      <div className="icon">
        <svg
          width={width}
          height={width}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.85 13.3333L33.4167 29.9M16.15 13.3333H35.2833M12.3 20L21.8667 3.43334M16.15 26.6667L6.58333 10.1M23.85 26.6667H4.71666M27.7 20L18.1333 36.5667M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33334 20 3.33334C29.2047 3.33334 36.6667 10.7953 36.6667 20Z"
            stroke="#4CAF4F"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {text ? (
        <span className="text-xl text-black font-bold inline-block">
          {!admin ? "Elgand" : "Admin Page"}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default Logo;
