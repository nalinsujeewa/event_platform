import Image from "next/image";
import Link from "next/link";

function year() {
  const date = new Date();
  const year = date.getFullYear();

  return year;
}
const Footer = () => {
  return (
    <footer className=" border-t">
      <div className=" flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center text-sm sm:flex-row">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="log0"
            height={38}
            width={128}
          />
        </Link>
        <p>
          {new Date().getFullYear()} Evently . All Rights reserved by SASH Web
          Dev
        </p>
      </div>
    </footer>
  );
};

export default Footer;
