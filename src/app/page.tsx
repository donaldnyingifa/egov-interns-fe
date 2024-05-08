import { MaxWidthContainer } from "@/components/MaxWidthContainer";
import { NavLinks } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav>
        <MaxWidthContainer className="flex justify-between pt-4 items-center">
          <Link
            href="/"
            className="flex items-center w-fit gap-2 hover:underline"
          >
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={60}
              height={60}
              className="w-12 sm:w-14"
            />
            <span className="font-semibold text-xl hidden sm:block tracking-wide">
              E-Governance Interns
            </span>
          </Link>

          <NavLinks />
        </MaxWidthContainer>
      </nav>

      <main>
        <div>
          <MaxWidthContainer className="flex lg:items-center flex-col lg:flex-row gap-20 md:mt-28">
            <div className="lg:w-[50%]">
              <h1 className="mt-24 md:mt-0 text-4xl sm:text-5xl font-bold">
                Connect with other interns and showcase your work.
              </h1>
              <div></div>
              <p className="sm:text-xl mt-6 leading-relaxed">
                Join our platform to share your internship journey, collaborate
                with peers, and build your professional network.
              </p>

              <Button asChild size="lg" className="mt-10">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            <div className="lg:w-[50%]">
              <Image
                src="/hero.jpg"
                alt="Coding environment"
                width={400}
                height={400}
                className="w-[100vw] h-60 md:h-96 object-cover object-center"
              />
            </div>
          </MaxWidthContainer>
        </div>

        <div className="py-10" id="about-us">
          <MaxWidthContainer>
            <h1 className="text-4xl sm:text-5xl font-bold mt-24">Who We Are</h1>
            <p className="mt-6 lg:w-[70%] sm:text-xl leading-relaxed">
              At E-Governance Interns, we believe that every internship
              experience should be a transformative journey filled with
              learning, growth, and meaningful connections. Founded in 2024, our
              platform is dedicated to empowering interns like you to showcase
              your work, connect with peers, and launch your career.
            </p>
          </MaxWidthContainer>
        </div>

        <div className="mt-16 py-4 bg-primary">
          <p className="text-secondary text-center">
            Designed and developed by E-Governance Interns ©️2024
          </p>
        </div>
      </main>
    </>
  );
}
