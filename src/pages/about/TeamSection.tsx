/* eslint-disable @next/next/no-img-element */
// components/TeamSection.js

import Link from "next/link";

const teamMembers = [
  {
    name: "Jerry Jiang",
    degree: "3rd Year, Finance",
    role: "CMP Director",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQEdDXfkg9jmqQ/profile-displayphoto-shrink_800_800/0/1667631923188?e=1703721600&v=beta&t=eB2YA9GKZaVnoQ-63vuFDobtlMEGTFBEBTHqU_jX3YI",
    linkedin: "https://www.linkedin.com/in/jiangjjerry/",
  },
  {
    name: "Lou Charitat",
    degree: "4th Year, Marketing",
    role: "VP | Marketing",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQGgBavj2hO6BQ/profile-displayphoto-shrink_800_800/0/1669590132110?e=1704326400&v=beta&t=BDxo_oe6kz7OklqfeEKpE1h-b2zUIyR2iFJJL_NnbGE",
    linkedin: "https://www.linkedin.com/in/loucharitat/",
  },
  {
    name: "Tanya Arora",
    degree: "4th Year, Operations",
    role: "VP | Events",
    avatar:
      "https://media.licdn.com/dms/image/C5603AQGliuano_7ikw/profile-displayphoto-shrink_800_800/0/1653860683922?e=1704326400&v=beta&t=rOm48DfjT7q_JxYaeZu71EPeLcuzR7JsrUg0MtkNbVU",
    linkedin: "https://www.linkedin.com/in/tanya-arora15/",
  },
  {
    name: "Jessalyn Sin",
    degree: "3rd Year, Accounting",
    role: "VP | Academic",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQEJ9wLQGQ5xuA/profile-displayphoto-shrink_800_800/0/1695377202755?e=1704326400&v=beta&t=RS3GaJM67UoeU4wg38LN7VAC2pAwgVEetAWWhNMVOdo",
    linkedin: "https://www.linkedin.com/in/s-jessalyn/",
  },
  {
    name: "Vedant Capoor",
    degree: "2nd Year",
    role: "VP | Relations",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQHACQhG6NMQyw/profile-displayphoto-shrink_800_800/0/1696752480960?e=1704326400&v=beta&t=lEa4NDLb_y929ZDW0nSGuHrQRGCg_hjfXtWyVnJ-ruU",
    linkedin: "https://www.linkedin.com/in/vedantcapoor/",
  },
  {
    name: "Sophie Yang",
    degree: "2nd Year",
    role: "VP | Internal",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQE2rgAigt6GcQ/profile-displayphoto-shrink_800_800/0/1669021424090?e=1704326400&v=beta&t=Dx1HXH1ZlbH8inkwAROco_gKtkBDM-BCgVgyGCOPfII",
    linkedin: "https://www.linkedin.com/in/sophie-yang-546b32161/",
  },
  {
    name: "Katherine Sau",
    degree: "2nd Year",
    role: "VP | Events",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQGTQ533A2t4Iw/profile-displayphoto-shrink_800_800/0/1696563354670?e=1704326400&v=beta&t=ydozPHu09LGmtBAmsFQvMF6rRMAnESIXKlvD_bjQUE4",
    linkedin: "https://www.linkedin.com/in/katherinesau/",
  },
  {
    name: "Sam Cui",
    degree: "2nd Year",
    role: "VP | Logistics",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQFTAZ_c5BTS2Q/profile-displayphoto-shrink_800_800/0/1673841575891?e=1704326400&v=beta&t=akRSyXwjm0rL_Loi3HekBvl49p6rTQGP89SkWpKtiD0",
    linkedin: "https://www.linkedin.com/in/sam-cui-80627a256/",
  },
  {
    name: "Bella Chan",
    degree: "2nd Year",
    role: "VP | Finance",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQFTcvhJdbEu2A/profile-displayphoto-shrink_800_800/0/1682050958448?e=1704326400&v=beta&t=ehNchEXQ_GATgJWHHNV_zMkiKrHbVqVwZOURWaFrvCE",
    linkedin: "https://www.linkedin.com/in/bella-chan-/",
  },
  {
    name: "Charmaine Siu",
    degree: "4th Year, BUCS",
    role: "VP | Academic",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQHvP3HJBkGMTg/profile-displayphoto-shrink_800_800/0/1696634242698?e=1704326400&v=beta&t=-bHqusIpW6zBW7ODcJUD8iPxPq8BNAaWGOUOV82RbPE",
    linkedin: "https://www.linkedin.com/in/charmaine-siu/",
  },
  {
    name: "Andee Anchacoso",
    degree: "2nd Year",
    role: "2nd Year Rep",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQHguaiFiBNO_A/profile-displayphoto-shrink_800_800/0/1699257877687?e=1704931200&v=beta&t=OxX_J54NRcdkSzPqJd27cwcsoJ0peG0jlWDayLhbimM",
    linkedin: "https://www.linkedin.com/in/andeeachacoso/",
  },
  {
    name: "Melinda Ding",
    degree: "2nd Year",
    role: "VP | Marketing",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQF8N72JhFI99g/profile-displayphoto-shrink_800_800/0/1696575276005?e=1704326400&v=beta&t=brkOA9tUEdWVA9Ip3aAGQSwKCAkWaKqGDwuymHcxhes",
    linkedin: "https://www.linkedin.com/in/melinda-ding-b3127219a/",
  },
];

export default function TeamSection() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">This Year&apos;s Team</h1>

      <div className="flex flex-row flex-wrap items-center justify-center gap-8 ">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center rounded-md p-4"
          >
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="mx-auto h-36 w-36 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-700 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="font-semibold text-white">View</p>
              </div>
            </Link>
            <p className="mt-2 text-center text-sm font-semibold">
              {member.name}
            </p>
            <p className="text-center text-sm">{member.degree}</p>
            <p className="text-center text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
