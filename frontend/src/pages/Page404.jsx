import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="px-8 bg-white flex justify-center items-center pt-24">
      <div className="flex flex-col w-9/12 gap-8 items-center justify-center">
        <h2 className="text-secondary text-center text-3xl">PETIT CURIEUX !</h2>
        <h3 className="text-secondary text-center text-base md:text-xl">
          LA PAGE QUE TU RECHERCHES N&apos;EXISTE PAS.
        </h3>
        <Link to="/" className="h-1/2 max-h-[50vh]">
          <img
            src="./public/assets/logo/meeple404.png"
            className="object-cover object-center"
            alt="404"
          />
        </Link>
        <p className="text-3xl">⇧ ⇧ ⇧</p>
        <p className="pb-8 text-center">
          Clique sur ce meeple pour revenir à la maison.
        </p>
      </div>
    </div>
  );
}

export default Page404;
