import Heading from "../../components/Headings/Heading";
import TeamCard2 from "./TeamCard2";
import Meta from "../../components/Meta/Meta";


const Team = () => {
  const team2 = [
    {
      img2: "https://avatars.githubusercontent.com/u/72189098?v=4",
      name2: "Ankur kumar",
      detail2: "Team Member",
      academics: "BTech. cSE 2021-25",
      socials: [
        {
          name: "github",
          link: "https://github.com/ankur-code"
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/in/ankur/"
        },
        {
          name: "twitter",
          link: ""
        },
        {
          name: "instagram",
          link: ""
        },
      ]
    },
    {
      img2: "https://avatars.githubusercontent.com/u/77230416?v=4",
      name2: "Lokit kawaskar",
      detail2: "Team Member",
      academics: "BTech. CSE 2021-25",
      socials: [
        {
          name: "github",
          link: "https://github.com/lokit"
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/in/lokit/"
        },
        {
          name: "twitter",
          link: "https://twitter.com/lokit"
        },
        {
          name: "instagram",
          link: "https://instagram.com/lokit"
        },
      ]
    },
    {
      img2: "https://cloud.appwrite.io/v1/storage/buckets/photos/files/6511acf5b7d542b7f9a8/view?project=tesla-official-web&mode=admin",
      name2: "Saurav Kumar",
      detail2: "Team Member",
      academics: "BTech. CSE 2021-25",
      socials: [
        {
          name: "github",
          link: "https://github.com/saurav"
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/in/saurav/"
        },
        {
          name: "twitter",
          link: "https://twitter.com/saurav"
        },
        {
          name: "instagram",
          link: "https://www.linkedin.com/in/saurav/"
        },
      ]
    },
  ];

  return (
    <div>
      <Meta name="Web Team" />
      <Heading heading="Web Team" heading1='Alumni Website'></Heading>

      <section>
        <div className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <p className="text-base text-gray-400">
              We're a team of designers and developers at NIT Srinagar. We're
              passionate about connecting alumni with our institution via the
              NITSgr Alumni platform, and building a community for lifelong
              learning and growth.
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {team2.map((team2, index) => (
              <TeamCard2
                key={index}
                img2={team2.img2}
                name2={team2.name2}
                detail2={team2.detail2}
                academics={team2.academics}
                socials={team2.socials}
                id={index}
              />
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-5xl md:px-0 px-3">
            <h2 className="font-semibold text-2xl pb-10 pt-10">Full List of Contributors</h2>
            <img height={280} className="mb-10 m-auto" src="https://contrib.rocks/image?repo=Rishabh-25-code/alumini-cell-nits" alt="team" />
            <a href="https://github.com/Rishabh-25-code/alumini-cell-nits/graphs/contributors" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4B164C] active:bg-gray-500 hover:scale-105 transition text-white font-medium hover:bg-black md:px-8 px-6 py-2 rounded-xl">
                Explore Contributions
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
