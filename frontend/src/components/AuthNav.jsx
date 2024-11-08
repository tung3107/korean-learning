function AuthNav() {
  return (
    <ul className="flex flex-row w-full my-3">
      <li className="py-4 px-7 w-full flex justify-center border-b-tint6 border-b-2 cursor-pointer">
        <button className="text-tint6 bg-transperant">
          <span className="font-medium">Sign in</span>
        </button>
      </li>
      <li className="py-4 px-7 w-full flex justify-center cursor-pointer">
        <button>
          <span className="font-medium">Sign up</span>
        </button>
      </li>
    </ul>
  );
}

export default AuthNav;
