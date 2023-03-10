import { useRouter } from "next/router";
import { useContext } from "react";
import { setTheme, setWalletAddress } from "../../state/actions/global";
import { GlobalContext } from "../../state/contexts/GlobalContext";

const Header = () => {
  const {
    state: { darkMode, walletAddress },
    dispatch,
  } = useContext(GlobalContext);

  const router = useRouter();

  return (
    <div className="flex justify-between w-full gap-2 px-4 py-8 lg:px-40 ">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}>
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.1031 0.355469C6.08377 0.355469 0.354736 6.08451 0.354736 13.1039C0.354736 20.1232 6.08377 25.8522 13.1031 25.8522C20.1225 25.8522 25.8515 20.1232 25.8515 13.1039C25.8515 6.08451 20.1225 0.355469 13.1031 0.355469ZM3.91603 13.1039C3.91603 10.4716 5.05151 8.0458 6.85796 6.39418C7.58054 5.72322 8.81925 5.92966 9.33538 6.80708L12.5354 12.3297C12.8451 12.8458 12.8451 13.4651 12.5354 13.9813L9.33538 19.5039C8.81925 20.4329 7.58054 20.5877 6.80635 19.8651C5.05151 18.1103 3.91603 15.7361 3.91603 13.1039ZM16.8709 19.4006L13.6709 13.8781C13.3612 13.3619 13.3612 12.7426 13.6709 12.2264L16.8709 6.70385C17.387 5.82643 18.5741 5.61998 19.3483 6.29095C21.1547 7.94257 22.2902 10.3684 22.2902 13.0006C22.2902 15.6329 21.1547 18.0587 19.3483 19.7103C18.5741 20.5361 17.387 20.3297 16.8709 19.4006Z"
            fill="white"
          />
        </svg>

        <p
          className={`text-lg text-black/70 select-none font-semibold`}
          // onClick={() => dispatch(setTheme(!darkMode))}
        >
          ZK KYC
        </p>
      </div>
      {walletAddress.length > 0 && (
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer select-none bg-brand-300"
          onClick={() => dispatch(setWalletAddress(""))}>
          <div className="font-semibold text-brand-700">
            {walletAddress.toString().slice(0, 7) +
              "..." +
              walletAddress.toString().slice(-7)}
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 10.75L9.25 13L13 7.75M19 10C19 11.268 18.37 12.39 17.407 13.068C17.5108 13.6608 17.4701 14.2698 17.2886 14.8436C17.107 15.4173 16.7899 15.9388 16.364 16.364C15.9388 16.7899 15.4173 17.107 14.8436 17.2886C14.2698 17.4701 13.6608 17.5108 13.068 17.407C12.7222 17.8995 12.2629 18.3014 11.7288 18.5787C11.1948 18.856 10.6017 19.0005 10 19C8.732 19 7.61 18.37 6.932 17.407C6.33923 17.5107 5.73021 17.47 5.15649 17.2885C4.58276 17.1069 4.06122 16.7898 3.636 16.364C3.21013 15.9388 2.89298 15.4173 2.71142 14.8436C2.52987 14.2698 2.48925 13.6608 2.593 13.068C2.10052 12.7222 1.69862 12.2629 1.42133 11.7288C1.14403 11.1948 0.999511 10.6017 1 10C1 8.732 1.63 7.61 2.593 6.932C2.48925 6.33923 2.52987 5.73019 2.71142 5.15645C2.89298 4.58271 3.21013 4.06117 3.636 3.636C4.06122 3.21019 4.58276 2.8931 5.15649 2.71154C5.73021 2.52999 6.33923 2.48933 6.932 2.593C7.27785 2.10058 7.73722 1.69873 8.27126 1.42144C8.80529 1.14415 9.39827 0.999595 10 1C11.268 1 12.39 1.63 13.068 2.593C13.6608 2.48933 14.2698 2.52999 14.8435 2.71154C15.4172 2.8931 15.9388 3.21019 16.364 3.636C16.7898 4.06122 17.1069 4.58276 17.2885 5.15649C17.47 5.73021 17.5107 6.33923 17.407 6.932C17.8995 7.27779 18.3014 7.73715 18.5787 8.2712C18.856 8.80525 19.0005 9.39825 19 10V10Z"
              stroke="#00D085"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Header;
