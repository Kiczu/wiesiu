import React from "react";
import { SHOP } from "../../paths";
import useWooCommerceProducts from "../../hooks/useWooCommerceProducts";
import SectionHero from "./SectionHero/SectionHero";
import SectionSlider from "./SectionSlider/SectionSlider";
import SectionMeetings from "./SectionMeetings/SectionMeeting";
import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
import SectionContact from "./SectionContact/SectionContact";
import "./Home.scss";

const Home = () => {
  const comics = useWooCommerceProducts(18);
  const collections = useWooCommerceProducts(23);
  const gadgets = useWooCommerceProducts(19);

  return (
    <>
      <SectionHero />
      <SectionSlider
        id={"bookstore"}
        products={comics}
        sectionTitle={"Księgarnia"}
        colorTitle={"black"}
        buttonText={"Do sklepu"}
        variant={"blue"}
        link={SHOP}
      />
      <SectionMeetings id={"meetings"} />
      <SectionSlider
        id={"colections"}
        products={collections}
        sectionTitle={"Kolekcje"}
        colorTitle={"black"}
        buttonText={"Do sklepu"}
        variant={"blue"}
        link={SHOP}
      />
      <SectionSlider
        id={"gadgets"}
        products={gadgets}
        sectionTitle={"Gadżety"}
        colorTitle={"black"}
        buttonText={"Do sklepu"}
        variant={"blue"}
        backgroundColor={"#edf2ff"}
        link={SHOP}
      />
      <InstagramFeed />
      <SectionContact id={"contact"} colorTitle={"black"} />
    </>
  );
};

export default Home;
