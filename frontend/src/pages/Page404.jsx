import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="w-screen absolute right-0 bottom-0 top-0 px-8 bg-white flex justify-center pt-24">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h2 className="text-secondary text-3xl">PETIT CURIEUX !</h2>
        <h3 className="text-secondary whitespace-nowrap text-base md:text-xl">
          LA PAGE QUE TU RECHERCHES N’EXISTE PAS.
        </h3>
        <Link to="/" className="h-1/2 max-h-[50vh]">
          <img
            src="./public/assets/logo/meeple404.png"
            className="object-cover object-center"
            alt="404"
          />
        </Link>
        <p className="text-3xl">⇧ ⇧ ⇧</p>
        <p>Clique sur ce meeple pour revenir à la maison.</p>
      </div>
    </div>
  );
}

export default Page404;
